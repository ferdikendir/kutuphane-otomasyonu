import { Component, Inject, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Author } from "@models/author.model";
import { AuthorService } from "@services/author.service";

@Component({
  selector: "library-author-form-dialog",
  templateUrl: "./author-form-dialog.component.html",
  styles: ``,
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule
  ],
  providers: [
    AuthorService
  ]
})
export class AuthorFormDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<AuthorFormDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authorService = inject(AuthorService);

  editMode = signal(!!this.data);

  form = this.formBuilder.group({
    name: ['', { validators: [Validators.required] }],
    surname: ['', { validators: [Validators.required] }]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Author,
  ) {

    if (this.data) {
      this.form.patchValue(this.data);
    }

  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSaveClick() {

    if (this.form.invalid) {
      return;
    }

    if (this.editMode()) {
      this.update();
    }
    else {
      this.insert();
    }

  }

  private insert() {
    const author: Author = { ...this.form.getRawValue() } as Author;

    this.authorService.insert(author).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private update() {
    const author: Author = {
      ...this.form.getRawValue(),
      id: this.data.id
    } as Author;

    this.authorService.update(author).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
