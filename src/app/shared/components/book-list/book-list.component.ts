import { Component, computed, effect, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { Book } from "@models/book.model";
import { BookDetailFormDialogComponent } from "@modules/book/book-detail-form-dialog/book-detail-form-dialog.component";
import { AdminDashboardService } from "@services/admin-dashboard.service";
import { allBooks, dispatchAllBooks } from "@store/book-users.store";

@Component({
  selector: "library-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatDivider,
    MatButtonModule
  ],
})
export class BookListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly adminDashboardService = inject(AdminDashboardService);

  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year'];

  dataSource: Book[] = [];

  books = computed(() => allBooks());

  constructor() {

    effect(() => {
      this.dataSource = this.books();
    });

  }

  addNewBook() {
    this.dialog.open(BookDetailFormDialogComponent, {
      width: '400px'
    }).afterClosed().subscribe((refresh: boolean) => dispatchAllBooks(this.adminDashboardService));
  }

}

