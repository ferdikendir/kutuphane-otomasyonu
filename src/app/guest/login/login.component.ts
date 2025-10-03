import { Component, inject } from "@angular/core";
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "library-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
})
export class LoginComponent {

  private readonly formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

  }
}
