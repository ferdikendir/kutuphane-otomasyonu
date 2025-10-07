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
import { BookService } from '@services/book.service';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from '@services/author.service';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgFor } from '@angular/common';
import { Author } from '@models/author.model';

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
    MatDividerModule,
    MatSelectModule,
    AsyncPipe
  ],
  providers: [
    BookService,
    AuthorService
  ]
})
export class BookDetailFormDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<BookDetailFormDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly authorService = inject(AuthorService);
  private readonly toastr = inject(ToastrService);

  editMode = signal(!!this.data);
  authors$ = this.authorService.list();

  bookForm: FormGroup = this.formBuilder.group({
    isbn: [{ value: '', disabled: this.editMode() }, { validators: [Validators.required] }],
    title: ['', { validators: [Validators.required] }],
    author_id: ['', { validators: [Validators.required] }],
    edition: ['', { validators: [Validators.required] }],
    year: ['', { validators: [Validators.required, Validators.pattern("^[0-9]{4}$")] }],
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Book,
  ) {

    if (this.data) {
      this.bookForm.patchValue(this.data);
      this.bookForm.get('author_id')?.setValue(this.data.author.id);
    }

  }


  onNoClick(): void {

    this.dialogRef.close();
  }

  onSaveClick(): void {

    this.bookForm.markAllAsTouched();

    if (this.bookForm.valid) {

      const formValue = this.bookForm.getRawValue();

      if (this.editMode()) {
        this.updateBook({ ...formValue });
      } else {
        this.insertBook({ ...formValue });
      }

    }

  }

  compareWith = (one: Author, two: Author) => one && two && (one.id === two.id);

  private insertBook(book: Book): void {
    this.bookService.insert(book).subscribe(response => {
      this.toastr.success('Book added successfully.', 'Success');

      this.dialogRef.close(true);

    });
  }

  private updateBook(book: Book): void {
    this.bookService.update(book).subscribe(response => {
      this.toastr.success('Book updated successfully.', 'Success');

      this.dialogRef.close(true);

    });
  }

}
