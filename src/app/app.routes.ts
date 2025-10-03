import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { guestGuard } from '@guards/guest.guard';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { LayoutComponent } from '@layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('@modules/guest/guest.routes').then(m => m.authRoutes),
    canActivate: [guestGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
      }
    ]
  }
];
