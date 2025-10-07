import { Component, DestroyRef, inject } from "@angular/core";
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "@services/auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { LoginRequestModel } from "@models/auth.model";

@Component({
  selector: "library-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink
  ]
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  errorMessage: string | null = null;

  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const { username, password } = this.form.value;

    const request: LoginRequestModel = {
      username,
      password
    };

    this.authService.login(request).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(user => {
      if (!user) {
        this.errorMessage = 'Invalid username or password';
      }
    });

  }
}
