import { Component, DestroyRef, Input, effect, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { Author } from "@models/author.model";
import { AuthorService } from "@services/author.service";
import { AuthorFormDialogComponent } from "./author-form-dialog/author-form-dialog.component";
import { NgClass } from "@angular/common";
import { authors, dispatchAuthors } from "@modules/core/store/author.store";
import { dispatchBookUsers } from "@modules/core/store/book-user.store";
import { BookUserService } from "@services/book-user.service";

@Component({
  selector: "library-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.scss"],
  standalone: true,
  providers: [
    AuthorService,
    BookUserService
  ],
  imports: [
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    NgClass
  ]
})
export class AuthorComponent {

  @Input() isWidget = false;

  private readonly authorService = inject(AuthorService);
  private readonly bookUserService = inject(BookUserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  tableColumns: string[] = ['name', 'surname'];

  dataSource: Author[] = [];

  loading = signal(false);

  constructor() {

    effect(() => {
      this.dataSource = authors();
    });

    this.fetchAuthors();
  }

  addNewAuthor() {
    this.dialog.open(AuthorFormDialogComponent, {
      width: '400px'
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => {
      if (result) {
        this.fetchAuthors();
      }
    });
  }

  updateAuthor(author: Author) {
    this.dialog.open(AuthorFormDialogComponent, {
      width: '400px',
      data: author
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => {
      if (result) {
        this.fetchAuthors();

        dispatchBookUsers(this.bookUserService);
      }
    });
  }

  private fetchAuthors() {
    dispatchAuthors(this.authorService);
  }

}
