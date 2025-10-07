import { books } from '@store/book.store';
import { Component, EventEmitter, Output, effect, signal } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { Book } from "@models/book.model";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: "library-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule
  ]
})
export class BookListComponent {

  @Output() emitUpdateBook = new EventEmitter<Book>();


  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year', 'actions'];

  dataSource: Book[] = [];

  loading = signal(true);

  constructor() {

    effect(() => {
      this.dataSource = books();
    });

  }

}
