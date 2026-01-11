import { Component, computed, inject, ViewChild, OnInit, OnDestroy, signal } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Topbar } from './components/topbar/topbar';
import { SessionService } from '../../../core/auth/services/session.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter, Subject, takeUntil } from 'rxjs';
import { TopbarService } from '../../../core/ui/services/topbar.service';
import { Session } from '../../../core/auth/models/Session.model';

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
export class Layout implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private session = inject(SessionService);
  private topbarService = inject(TopbarService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private destroyed = new Subject<void>();

  sessionData = signal<Session | null>(this.session.getSession());

  ngOnInit() {
    const session = this.sessionData();

    if (!session) {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    const redirectMap = {
      ADMIN: '/admin/pacientes',
      PROFESSIONAL: '/professional/agenda',
      PATIENT: '/patient/consultas',
    };
    this.router.navigateByUrl(redirectMap[session.role]);

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        const route = this.getDeepestRoute(this.route);
        const config = route.snapshot.data['topbar'];
        if (config) {
          this.topbarService.set(config);
        }
      });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  navItems = computed(() => {
    const session = this.sessionData();
    if (!session) return [];

    const role = session.role;

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

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
