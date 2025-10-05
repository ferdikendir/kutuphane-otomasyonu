import { Component, computed, effect } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { Book } from "@models/book.model";
import { allBooks } from "@store/book-users.store";

@Component({
  selector: "library-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatDivider
  ],
})
export class BookListComponent {

  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year'];

  dataSource: Book[] = [];

  books = computed(() => allBooks());

  constructor() {

    effect(() => {
      this.dataSource = this.books();
    });

  }

}

