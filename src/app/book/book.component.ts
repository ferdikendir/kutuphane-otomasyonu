import { Component, DestroyRef, Input, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Book } from "@models/book.model";
import { BookService } from "@services/book.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  MatDialog
} from '@angular/material/dialog';
import { BookDetailFormDialogComponent } from "./book-detail-form-dialog/book-detail-form-dialog.component";
import { MatDivider } from "@angular/material/divider";
import { NgClass } from "@angular/common";
import { books, dispatchBooks } from "@store/book.store";
import { BookListComponent } from "@components/book-list/book-list.component";
import { BookBorrowDialogComponent } from "./book-borrow-dialog/book-borrow-dialog.component";
import { BookUserService } from "@services/book-user.service";
import { dispatchBookUsers } from "@modules/core/store/book-user.store";

@Component({
  selector: "library-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDivider,
    NgClass,
    BookListComponent
  ],
  providers: [
    BookService,
    BookUserService
  ]
})
export class BookComponent {

  @Input() isWidget = false;

  private readonly bookService = inject(BookService);
  private readonly bookUserService = inject(BookUserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  bookStore = computed(() => books());

  constructor() {

    this.fetchBooks();

  }

  checkBook(id: string) {
    this.bookUserService.checkBook(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.fetchBooks();
    });
  }

  borrowBook(book: Book) {

    this.bookUserService.checkBook(book.id as string).subscribe((isAvailable: boolean) => {
      if (!isAvailable) {
        alert('This book is not available for borrowing.');
        return;
      }

      this.dialog.open(BookBorrowDialogComponent, {
        width: '400px',
        data: book
      }).afterClosed().pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((result) => {
        if (result) {
          this.fetchBooks();

          if (this.isWidget) {
            dispatchBookUsers(this.bookUserService);
          }
        }
      });
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
