import { Component, DestroyRef, computed, effect, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Book } from "@models/book.model";
import { books, dispatchBooks } from "@store/book.store";
import { DateDiffPipe } from "@pipes/date-diff.pipe";
import { BookService } from "@services/book.service";
import { finalize } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "library-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatTooltipModule,
    DateDiffPipe,
    MatButtonModule
  ],
  providers: [
    BookService
  ]
})
export class BookComponent {

  private readonly bookService = inject(BookService);
  private readonly destroyRef = inject(DestroyRef);

  bookStore = computed(() => books())

  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year'];

  dataSource: Book[] = [];

  loading = signal(true);

  constructor() {

    effect(() => {

      this.bookService.getAllBooks().pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      ).subscribe((data: Book[]) => {
        dispatchBooks(data);
      });

    });

    effect(() => {
      this.dataSource = this.bookStore();
    });

  }

}
