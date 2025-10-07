import { Component, DestroyRef, computed, inject } from "@angular/core";
import { allBookUsers, allBooks, dispatchAllBookUsers, dispatchAllBooks, dispatchAllUsers } from "@store/book-users.store";
import { AdminDashboardService } from "@services/admin-dashboard.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AuthorComponent } from "@modules/author/author.component";
import { BookComponent } from "@modules/book/book.component";

@Component({
  selector: "library-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
  standalone: true,
  providers: [
    AdminDashboardService
  ],
  imports: [BookComponent, AuthorComponent]
})
export class AdminDashboardComponent {

  private readonly adminDashboardService = inject(AdminDashboardService);
  private readonly destroyRef = inject(DestroyRef);


  books = computed(() => allBooks());
  bookUsers = computed(() => allBookUsers());


  constructor() {
    this.getAllUsers();
    this.getAllBooks();
    this.getAllBookUsers();
  }


  getAllUsers() {
    this.adminDashboardService.getAllUsers().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => {
      dispatchAllUsers(users);
    });
  }

  getAllBooks() {
    dispatchAllBooks(this.adminDashboardService);
  }

  getAllBookUsers() {
    this.adminDashboardService.getAllBookUsers().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(bookUsers => {
      dispatchAllBookUsers(bookUsers);
    });
  }

}
