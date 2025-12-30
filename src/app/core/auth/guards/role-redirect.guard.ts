import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

const ROLE_REDIRECT_MAP: Record<UserRole, string> = {
  ADMIN: '/admin/pacientes',
  PROFESSIONAL: '/professional/agenda',
  PATIENT: '/patient/consultas',
};

function getRedirectByRole(role: UserRole): string {
  return ROLE_REDIRECT_MAP[role];
}

@Injectable({ providedIn: 'root' })
export class RoleRedirectGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const session = this.authService.getSession();

    if (!session) {
      this.router.navigate(['/login']);
      return false;
    }

    const redirect = getRedirectByRole(session.role);
    this.router.navigateByUrl(redirect);

    return false;
  }
}
