import { NgClass } from "@angular/common";
import { Component, DestroyRef, Input, effect, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { User } from "@models/user.model";
import { UserService } from "@services/user.service";
import { UserDetailDialogComponent } from "./user-detail-dialog/user-detail-dialog.component";
import { dispatchUserList, userList } from "@store/user-list-store";
import { UserRoleDirective } from "@directives/user-role.directive";

@Component({
  selector: "library-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    NgClass,
    MatDivider,
    UserRoleDirective
  ],
  providers: [UserService]
})
export class UserComponent {

  @Input() isWidget = false;

  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  loading = false;

  tableColumns: string[] = ['name', 'surname', 'username', 'role'];

  dataSource: User[] = [];

  constructor() {

    effect(() => {
      this.dataSource = userList();
    });

    this.fetchUsers();
  }

  updateUser(user: User) {
    this.dialog.open(UserDetailDialogComponent, {
      width: '400px',
      data: user
    }).afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  private fetchUsers() {
    dispatchUserList(this.userService);
  }
}
