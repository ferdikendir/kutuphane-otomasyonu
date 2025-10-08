import { Component } from "@angular/core";
import { AuthorComponent } from "@modules/author/author.component";
import { BookUserComponent } from "@modules/book-user/book-user.component";
import { BookComponent } from "@modules/book/book.component";
import { BookService } from "@services/book.service";
import { BookUserListComponent } from "@components/book-user-list/book-user-list.component";

@Component({
  selector: "library-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
  standalone: true,
  providers: [
    BookService
  ],
  imports: [BookComponent, AuthorComponent, BookUserComponent, BookUserListComponent]
})
export class AdminDashboardComponent {

}
