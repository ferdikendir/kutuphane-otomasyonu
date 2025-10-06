import { Routes } from '@angular/router';
import { LoginComponent } from '@modules/guest/login/login.component';
import { RegisterComponent } from '@modules/guest/register/register.component';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
