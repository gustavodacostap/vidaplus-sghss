import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
// import { RoleGuard } from './core/auth/guards/role.guard';
import { RoleRedirectGuard } from './core/auth/guards/role-redirect.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./shared/components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        canActivate: [RoleRedirectGuard],
      },
    ],
  },
  // {
  //   path: 'admin',
  //   canActivate: [RoleGuard],
  //   data: { roles: ['ADMIN'] },
  //   loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  // },

  // {
  //   path: 'professional',
  //   canActivate: [RoleGuard],
  //   data: { roles: ['PROFESSIONAL'] },
  //   loadChildren: () =>
  //     import('./features/professional/professional.routes').then((m) => m.PROFESSIONAL_ROUTES),
  // },

  // {
  //   path: 'patient',
  //   canActivate: [RoleGuard],
  //   data: { roles: ['PACIENTE'] },
  //   loadChildren: () =>
  //     import('./features/patient/patient.routes').then((m) => m.PATIENT_ROUTES),
  // },
  //   ],
  // },

  // // 🚫 404
  // {
  //   path: '**',
  //   loadComponent: () => import('./shared/pages/not-found.page').then((m) => m.NotFoundPage),
  // },
];
