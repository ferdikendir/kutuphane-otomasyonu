import { Component, DestroyRef, computed, inject } from "@angular/core";
import { allBookUsers, allBooks, dispatchAllBookUsers, dispatchAllBooks, dispatchAllUsers } from "@store/book-users.store";
import { AdminDashboardService } from "@services/admin-dashboard.service";
import { UserListComponent } from "@components/user-list/user-list.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BookListComponent } from "@components/book-list/book-list.component";
import { BookUserListComponent } from "@components/book-user-list/book-user-list.component";

@Component({
  selector: "library-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
  standalone: true,
  providers: [
    AdminDashboardService,
    UserListComponent,
    BookListComponent,
    BookUserListComponent
  ],
  imports: [UserListComponent, BookListComponent, BookUserListComponent]
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
    this.adminDashboardService.getAllBooks().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(books => {
      dispatchAllBooks(books);
    });
  }

  getAllBookUsers() {
    this.adminDashboardService.getAllBookUsers().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(bookUsers => {
      dispatchAllBookUsers(bookUsers);
    });
  }

}
