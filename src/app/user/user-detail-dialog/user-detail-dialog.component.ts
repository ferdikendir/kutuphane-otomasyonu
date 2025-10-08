import { user } from '@store/user.store';
import { Component, DestroyRef, Inject, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { User } from "@models/user.model";
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: "library-user-detail-dialog",
  templateUrl: "./user-detail-dialog.component.html",
  styleUrls: ["./user-detail-dialog.component.scss"],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDividerModule,
  ],
  providers: [UserService]
})
export class UserDetailDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<UserDetailDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  form!: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {

    if (this.data) {
      this.form = this.formBuilder.group({
        id: [data.id],
        name: [{ value: data.name, disabled: false }, { validators: [Validators.required] }],
        surname: [{ value: data.surname, disabled: false }, { validators: [Validators.required] }],
        username: [{ value: data.username, disabled: true }],
      });
    }

  }


  onNoClick(): void {

    this.dialogRef.close();
  }


  onSaveClick(): void {

    this.form.markAllAsTouched();

    if (this.form.valid) {

      const formValue = this.form.getRawValue();

      const updatedUser: User = {
        id: formValue.id,
        name: formValue.name,
        surname: formValue.surname
      } as User;

      this.updateUser(updatedUser);

    }

  }

  updateUser(user: User) {

    this.userService.update(user).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {

      this.toastr.success('User updated successfully.', 'Success');

      this.dialogRef.close(true);
    });

  }
}
