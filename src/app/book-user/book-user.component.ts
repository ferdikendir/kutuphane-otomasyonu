import { NgClass } from "@angular/common";
import { Component, Input, computed, inject } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { BookUserListComponent } from "@components/book-user-list/book-user-list.component";
import { bookUsers, dispatchBookUsers } from "@store/book-user.store";
import { BookUserService } from "@services/book-user.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "library-book-user",
  templateUrl: "./book-user.component.html",
  styleUrls: ["./book-user.component.scss"],
  standalone: true,
  imports: [
    BookUserListComponent,
    MatDivider,
    NgClass,
    MatButtonModule
  ],
  providers: [
    BookUserService
  ]
})
export class BookUserComponent {

  @Input() isWidget = false;

  private readonly bookUserService = inject(BookUserService);

  bookUserStore = computed(() => bookUsers());

  constructor() {

    this.fetchBookUsers();

  }


  fetchBookUsers() {
    dispatchBookUsers(this.bookUserService);
  }

}
