import { Component, effect, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BookAvailableDirective } from "@directives/book-available.directive";
import { BookUser } from "@models/book-user.model";
import { bookUsers } from "@store/book-user.store";
import { BookUserService } from "@services/book-user.service";

@Component({
  selector: "library-book-user-list",
  templateUrl: "./book-user-list.component.html",
  styleUrls: ["./book-user-list.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatTooltipModule,
    BookAvailableDirective,
    MatButtonModule
  ],
  providers: [
    BookUserService
  ]
})
export class BookUserListComponent {


  tableColumns: string[] = ['isbn', 'bookName', 'authorName', 'userName', 'borrowDate', 'dueDate'];

  dataSource: BookUser[] = [];

  loading = signal(true);

  constructor() {

    effect(() => {
      this.dataSource = bookUsers();
    });

  }

}
