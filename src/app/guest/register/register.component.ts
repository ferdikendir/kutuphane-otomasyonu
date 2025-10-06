import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatError, MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "library-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    RouterLink
  ]
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastr = inject(ToastrService);

  form: FormGroup = this.formBuilder.group({
    name: ["", { validators: [Validators.required] }],
    surname: ["", { validators: [Validators.required] }],
    username: ["", { validators: [Validators.required] }],
    password: ["", { validators: [Validators.required, Validators.minLength(6)] }],
    confirmPassword: ["", { validators: [Validators.required, Validators.minLength(6)] }],
  });

  get password() {
    return this.form.get("password");
  }

  get confirmPassword() {
    return this.form.get("confirmPassword");
  }

  get passwordIsMatch() {
    return this.password?.value === this.confirmPassword?.value;
  }

  onRegisterClick() {

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const request = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.authService.register(request).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(response => {
      this.router.navigate(["/auth/login"]);
    }, error => {
      this.toastr.error(error.message, "Error");
    });

  }

}
