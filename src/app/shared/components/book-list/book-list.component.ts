import { books } from '@store/book.store';
import { Component, EventEmitter, Output, effect, signal } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { Book } from "@models/book.model";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: "library-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class BookListComponent {

  @Output() emitUpdateBook = new EventEmitter<Book>();
  @Output() emitBorrowBook = new EventEmitter<Book>();


  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year', 'actions'];

  dataSource: Book[] = [];

  loading = signal(true);

  constructor() {

    effect(() => {
      this.dataSource = books();
    });

  }

}
