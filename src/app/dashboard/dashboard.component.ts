import { Component } from "@angular/core";
import { user } from "@modules/core/store/user/user.store";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "library-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [
    MatTableModule
  ]
})

export class DashboardComponent {

  tableColumns: string[] = ['isbn', 'name', 'author', 'edition', 'year', 'status'];

  dataSource = [];

  userStore = user;

  constructor() { }
}
