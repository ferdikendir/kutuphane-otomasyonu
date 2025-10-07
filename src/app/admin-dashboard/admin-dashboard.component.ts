import { Component } from "@angular/core";
import { AuthorComponent } from "@modules/author/author.component";
import { BookComponent } from "@modules/book/book.component";
import { BookService } from "@services/book.service";

@Component({
  selector: "library-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
  standalone: true,
  providers: [
    BookService
  ],
  imports: [BookComponent, AuthorComponent]
})
export class AdminDashboardComponent {

}
