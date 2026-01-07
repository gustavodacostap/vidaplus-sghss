import { Component, computed, inject } from '@angular/core';
import { SessionService } from '../../../../../core/auth/services/session.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private session = inject(SessionService);

  navItems = computed(() => {
    const role = this.session.getSession()?.role;

    if (role === 'ADMIN') {
      return [{ label: 'Pacientes', icon: 'groups', route: '/admin/patients' }];
    }

    if (role === 'PROFESSIONAL') {
      return [{ label: 'Agenda', icon: 'event', route: '/professional/agenda' }];
    }

    return [{ label: 'Consultas', icon: 'medical_services', route: '/patient/appointments' }];
  });
}
