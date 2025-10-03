import { Component } from "@angular/core";

@Component({
  selector: "library-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent {
  books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
  ];
}
