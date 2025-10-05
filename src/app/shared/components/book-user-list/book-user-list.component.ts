import { NgClass } from "@angular/common";
import { Component, computed, effect } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { BookUser } from "@models/book-user.model";
import { allBookUsers } from "@modules/core/store/book-users.store";
import { DateDiffPipe } from "@pipes/date-diff.pipe";
import moment from "moment";

@Component({
  selector: "library-book-user-list",
  templateUrl: "./book-user-list.component.html",
  styleUrls: ["./book-user-list.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatDivider,
    DateDiffPipe,
    NgClass
  ]
})
export class BookUserListComponent {

  tableColumns: string[] = ['isbn', 'bookName', 'author', 'edition', 'year', 'userName', 'date', 'deadline'];

  dataSource: BookUser[] = [];

  bookUsers = computed(() => allBookUsers());

  today = moment();

  constructor() {

    effect(() => this.dataSource = this.bookUsers());

  }

}
