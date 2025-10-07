import { NgClass } from "@angular/common";
import { Component, DestroyRef, Input, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDivider } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { User } from "@models/user.model";
import { UserService } from "@services/user.service";
import { finalize } from "rxjs";

@Component({
  selector: "library-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    NgClass,
    MatDivider
  ],
  providers: [UserService]
})
export class UserComponent {

  @Input() isWidget = false;

  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  loading = signal(false);

  tableColumns: string[] = ['name', 'surname', 'username'];

  dataSource: User[] = [];

  constructor() {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.loading.set(true);
    this.userService.userList().pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading.set(false))
    ).subscribe((res) => {
      this.dataSource = res;
    });
  }
}
