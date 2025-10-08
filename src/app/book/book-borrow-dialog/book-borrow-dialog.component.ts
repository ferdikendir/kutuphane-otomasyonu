import { AsyncPipe } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from "@angular/material/select";
import { Book } from "@models/book.model";
import { BookUserService } from "@services/book-user.service";
import { UserService } from "@services/user.service";
import moment from "moment";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { BookUser } from "@models/book-user.model";

@Component({
  selector: "library-book-borrow-dialog",
  templateUrl: "./book-borrow-dialog.component.html",
  styleUrls: ["./book-borrow-dialog.component.scss"],
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
    MatSelectModule,
    AsyncPipe,
    MatMomentDateModule,
    MatDatepickerModule
  ],
  providers: [
    UserService,
    BookUserService
  ]
})
export class BookBorrowDialogComponent {

  private readonly userService = inject(UserService);
  private readonly dialogRef = inject(MatDialogRef<BookBorrowDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly bookUserService = inject(BookUserService);

  users$ = this.userService.userList();

  min = moment().add(4, 'days');
  max = moment().add(15, 'days');

  form = this.formBuilder.group({
    id: [''],
    user_id: ['', { validators: [Validators.required] }],
    book_id: ['', { validators: [Validators.required] }],
    borrow_date: [moment(), { validators: [Validators.required] }],
    due_date: ['', { validators: [Validators.required] }]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Book,
  ) {
    if (data) {
      this.form.patchValue({
        book_id: data.id
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSaveClick() {

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    const request: BookUser = {
      user_id: formValue.user_id as string,
      book_id: formValue.book_id as string,
      borrowedDate: moment(formValue.borrow_date).format('YYYY-MM-DD'),
      dueDate: moment(formValue.due_date).format('YYYY-MM-DD')
    };

    this.bookUserService.insert(request).subscribe(res => {
      this.dialogRef.close(true);
    });

  }
}
