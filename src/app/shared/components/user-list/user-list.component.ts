import { Component, computed, effect } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { User } from "@models/user.model";
import { allUsers } from "@modules/core/store/book-users.store";

@Component({
  selector: "library-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatDivider
  ],
})
export class UserListComponent {

  tableColumns: string[] = ['name', 'role'];

  users = computed(() => allUsers());

  dataSource: User[] = [];

  constructor() {
    effect(() => {
      this.dataSource = this.users();
    });
  }

}
