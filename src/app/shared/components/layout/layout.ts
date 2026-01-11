import {
  Component,
  computed,
  inject,
  ViewChild,
  OnInit,
  OnDestroy,
  signal,
  effect,
} from '@angular/core';
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
import { NAV_ITEMS } from './layout.config';

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

  ngAfterInitView() {
    effect(() => {
      const shouldBeOpen = this.topbarService.isOpen('sidenav');

      if (shouldBeOpen && !this.sidenav.opened) {
        this.sidenav.open();
      }

      if (!shouldBeOpen && this.sidenav.opened) {
        this.sidenav.close();
      }
    });

    this.sidenav.closedStart.pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.topbarService.close('sidenav');
    });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  toggleSidenav() {
    this.topbarService.open('sidenav');
  }

  navItems = computed(() => {
    const session = this.sessionData();
    if (!session) return [];

    const role = session.role;

    return NAV_ITEMS[role];
  });

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
