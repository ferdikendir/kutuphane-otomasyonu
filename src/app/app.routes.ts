import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { guestGuard } from '@guards/guest.guard';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { LayoutComponent } from '@layouts/layout/layout.component';
import { BookComponent } from '@modules/book/book.component';
import { Error403Component } from './error-403/error-403.component';
import { permissionGuard } from '@guards/permission.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@modules/guest/guest.routes').then(m => m.authRoutes),
    canActivate: [guestGuard]
  },
  {
    path: '',
    component: LayoutComponent,

    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [permissionGuard],
        data: { roles: ['user'] }
      },
      {
        path: 'books',
        component: BookComponent,
        canActivate: [permissionGuard],
        data: { roles: ['admin'] }
      }
    ]
  },
  {
    path: 'error-403',
    component: Error403Component
  },
  {
    path: '**',
    redirectTo: ''
  }
];
