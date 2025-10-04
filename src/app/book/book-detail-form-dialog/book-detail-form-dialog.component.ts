import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Inject, inject, signal } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Book } from "@models/book.model";
import { addBook, removeBook, updateBook } from '@store/book.store';
import { BookService } from '@services/book.service';
import { BookUser } from '@models/book-user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "library-book-detail-form-dialog",
  templateUrl: "./book-detail-form-dialog.component.html",
  styleUrls: ["./book-detail-form-dialog.component.scss"],
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
    MatDividerModule
  ],
  providers: [
    BookService
  ]
})
export class BookDetailFormDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<BookDetailFormDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly toastr = inject(ToastrService);

  editMode = signal(!!this.data);

  bookForm: FormGroup = this.formBuilder.group({
    isbn: [{ value: '', disabled: this.editMode() }, { validators: [Validators.required] }],
    name: ['', { validators: [Validators.required] }],
    author: ['', { validators: [Validators.required] }],
    edition: ['', { validators: [Validators.required] }],
    year: ['', { validators: [Validators.required, Validators.pattern("^[0-9]{4}$")] }],
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Book,
  ) {

    if (this.data) {
      this.bookForm.patchValue(this.data);
    }

  }

  onNoClick(): void {

    this.dialogRef.close();
  }

  onSaveClick(): void {

    this.bookForm.markAllAsTouched();

    if (this.bookForm.valid) {

      const formValue = this.bookForm.getRawValue();
      this.editMode() ? updateBook(formValue) : addBook(formValue);

      const message = this.editMode() ? 'Book updated successfully.' : 'Book added successfully.';
      this.toastr.success(message, 'Success');

      this.dialogRef.close();
    }

  }


  async onClickRemove(): Promise<void> {

    if (this.editMode()) {

      const exists = await this.checkBook();

      if (exists) {
        this.toastr.error('Cannot remove a book that is currently borrowed.', 'Error');
        return;
      }

      removeBook(this.data.isbn);
      this.toastr.success('Book removed successfully.', 'Success');
      this.dialogRef.close();
    }

  }

  checkBook(): Promise<boolean> {
    return new Promise((resolve) => {

      this.bookService.getBookByIsbn(this.data.isbn).subscribe((book: BookUser) => resolve(!!book));

    });
  }

}
