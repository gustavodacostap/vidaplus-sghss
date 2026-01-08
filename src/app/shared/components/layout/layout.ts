import { Component, computed, inject, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './components/topbar/topbar';
import { SessionService } from '../../../core/auth/services/session.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, RouterOutlet, Topbar, MatSidenavModule, MatListModule, MatIconModule],
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
      return [{ label: 'Pacientes', icon: 'groups', route: '/admin/pacientes' }];
    }

    if (role === 'PROFESSIONAL') {
      return [{ label: 'Agenda', icon: 'event', route: '/professional/agenda' }];
    }

    return [{ label: 'Consultas', icon: 'medical_services', route: '/patient/appointments' }];
  });
}
