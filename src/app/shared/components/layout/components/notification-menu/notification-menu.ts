import { Component, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { OverlayModule } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import {
  selectNotifications,
  selectUnreadNotificationsCount,
} from '../../../../../core/ui/store/ui.selectors';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { formatNotificationTime } from '../../../../utils/date.utils';
import {
  clearNotifications,
  markAllNotificationsAsRead,
} from '../../../../../core/ui/store/ui.actions';

@Component({
  selector: 'app-notification-menu',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    OverlayModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './notification-menu.html',
  styleUrl: './notification-menu.scss',
})
export class NotificationMenu {
  store = inject(Store);

  formatNotificationTime = formatNotificationTime;
  isOpen = signal(false);
  private openedOnce = false;
  readonly notifications = this.store.selectSignal(selectNotifications);
  readonly unreadCount = this.store.selectSignal(selectUnreadNotificationsCount);

  close() {
    this.isOpen.set(false);
  }

  clearNotifications() {
    this.store.dispatch(clearNotifications());
  }

  constructor() {
    effect(() => {
      const open = this.isOpen();

      // usuário abriu o menu em algum momento
      if (open) {
        this.openedOnce = true;
      }

      // ciclo completo: abriu → fechou
      if (!open && this.openedOnce && this.unreadCount() > 0) {
        this.store.dispatch(markAllNotificationsAsRead());

        // 🔁 reset explícito
        this.openedOnce = false;
      }
    });
  }
}
