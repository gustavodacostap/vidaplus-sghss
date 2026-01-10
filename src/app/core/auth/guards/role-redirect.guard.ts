import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserRole } from '../models/User.model';
import { SessionService } from '../services/session.service';

const ROLE_REDIRECT_MAP: Record<UserRole, string> = {
  ADMIN: '/admin/pacientes',
  PROFESSIONAL: '/professional/agenda',
  PATIENT: '/patient/consultas',
};

@Injectable({ providedIn: 'root' })
export class RoleRedirectGuard implements CanActivate {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  canActivate(): boolean {
    const session = this.sessionService.getSession();

    if (!session) {
      this.router.navigate(['/login']);
      return false;
    }

    const redirect = ROLE_REDIRECT_MAP[session.role];
    this.router.navigateByUrl(redirect);

    return false;
  }
}
