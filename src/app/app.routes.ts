import { Routes } from '@angular/router';

export const routes: Routes = [
  
    {path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
    {path: 'admin',  // For routing to Admin module
    loadChildren: () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule),
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full',  
  },
  {
    path: '**', redirectTo: '/login'  
  }
];
