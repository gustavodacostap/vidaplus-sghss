import { Component, computed, inject, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Topbar } from './components/topbar/topbar';
import { SessionService } from '../../../core/auth/services/session.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    Topbar,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private session = inject(SessionService);

  toggleSidenav() {
    this.sidenav.toggle();
  }

  navItems = computed(() => {
    const role = this.session.getSession()?.role;

    if (role === 'ADMIN') {
      return [
        { label: 'Pacientes', icon: 'groups', route: '/admin/pacientes' },
        { label: 'Profissionais', icon: 'medical_services', route: '/admin/profissionais' },
        { label: 'Consultas', icon: 'medical_information', route: '/admin/consultas' },
        { label: 'Leitos', icon: 'airline_seat_flat', route: '/admin/leitos' },
        { label: 'Relatórios', icon: 'analytics', route: '/admin/relatorios' },
        { label: 'Gestão de Usuários', icon: 'manage_accounts', route: '/admin/gestao-usuarios' },
      ];
    }

    if (role === 'PROFESSIONAL') {
      return [{ label: 'Agenda', icon: 'event', route: '/professional/agenda' }];
    }

    return [{ label: 'Consultas', icon: 'medical_services', route: '/patient/appointments' }];
  });
}
