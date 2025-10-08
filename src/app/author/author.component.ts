import { Component, DestroyRef, Input, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { Author } from "@models/author.model";
import { AuthorService } from "@services/author.service";
import { finalize } from "rxjs";
import { AuthorFormDialogComponent } from "./author-form-dialog/author-form-dialog.component";
import { NgClass } from "@angular/common";

@Component({
  selector: "library-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.scss"],
  standalone: true,
  providers: [
    AuthorService
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  tableColumns: string[] = ['name', 'surname'];

  dataSource: Author[] = [];

  loading = signal(false);

  constructor() {
    this.fetchAuthors();
  }

  private fetchAuthors() {
    this.loading.set(true);
    this.authorService.list().pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading.set(false))
    ).subscribe((data) => {
      this.dataSource = data;
    });
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
      }
    });
  }

}
