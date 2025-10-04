import { Component, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Book } from "@models/book.model";
import { DateDiffPipe } from "@pipes/date-diff.pipe";

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
})
export class BookComponent {
  books = [
    {
      isbn: "978-3-16-148410-0",
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      edition: "1st",
      year: 1925
    },
    {
      isbn: "978-0-14-118263-6",
      name: "1984",
      author: "George Orwell",
      edition: "1st",
      year: 1949
    },
    {
      isbn: "978-0-452-28423-4",
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      edition: "1st",
      year: 1960
    }
  ];


  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year'];

  dataSource: Book[] = this.books;

  loading = signal(true);

}
