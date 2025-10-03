import { Routes } from '@angular/router';
import { LoginComponent } from '@modules/guest/login/login.component';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
