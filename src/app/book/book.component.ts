import { Component, DestroyRef, Input, computed, effect, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Book } from "@models/book.model";
import { BookService } from "@services/book.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BookAvailableDirective } from "@directives/book-available.directive";
import {
  MatDialog
} from '@angular/material/dialog';
import { BookDetailFormDialogComponent } from "./book-detail-form-dialog/book-detail-form-dialog.component";
import { MatDivider } from "@angular/material/divider";
import { NgClass } from "@angular/common";
import { books, dispatchBooks } from "@store/book.store";

@Component({
  selector: "library-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatTooltipModule,
    BookAvailableDirective,
    MatButtonModule,
    MatDivider,
    NgClass
  ],
  providers: [
    BookService
  ]
})
export class BookComponent {

  @Input() isWidget = false;

  private readonly bookService = inject(BookService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year'];

  dataSource: Book[] = [];

  loading = signal(true);

  bookStore = computed(() => books());

  constructor() {

    this.fetchBooks();

    effect(() => {
      this.dataSource = this.bookStore();
    });

  }

  addNewBook() {
    this.dialog.open(BookDetailFormDialogComponent, {
      width: '400px'
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => {
      if (result) {
        this.fetchBooks();
      }
    });;
  }

  updateBook(book: Book) {
    this.dialog.open(BookDetailFormDialogComponent, {
      width: '400px',
      data: book
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => {
      if (result) {
        this.fetchBooks();
      }
    });
  }

  private fetchBooks() {

    dispatchBooks(this.bookService);

  }

}
