import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  canActivate(): boolean {
    return this.checkSession();
  }

  canActivateChild(): boolean {
    return this.checkSession();
  }

  private checkSession(): boolean {
    console.log('Checando sessão no AuthGuard');
    const session = this.sessionService.getSession();
    if (!session) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
