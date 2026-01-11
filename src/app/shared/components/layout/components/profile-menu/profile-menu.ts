import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SessionService } from '../../../../../core/auth/services/session.service';
import { Session } from '../../../../../core/auth/models/Session.model';
import { UserRole } from '../../../../../core/auth/models/User.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    OverlayModule,
    MatListModule,
    RouterLink,
  ],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.scss',
})
export class ProfileMenu {
  private session = inject(SessionService);
  private route = inject(Router);

  isOpen = signal(false);
  sessionData = signal<Session | null>(this.session.getSession());

  close() {
    this.isOpen.set(false);
  }

  logout() {
    this.session.clearSession();
    this.route.navigate(['/auth/login']);
  }

  formatRole(role: UserRole | undefined): string {
    if (!role) return '';

    const roleMap = {
      ADMIN: 'Administrador',
      PROFESSIONAL: 'Profissional de Saúde',
      PATIENT: 'Paciente',
    };
    return roleMap[role];
  }
}
