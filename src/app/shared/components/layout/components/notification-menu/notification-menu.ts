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
  setNotifications,
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
    const now = new Date();

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

    this.store.dispatch(
      setNotifications({
        notifications: [
          {
            id: '1',
            title: 'Consulta confirmada',
            description: 'Sua consulta com o Dr. João foi confirmada.',
            timestamp: new Date(now.getTime() - 5 * 60 * 1000), // há 5 minutos
            read: false,
          },
          {
            id: '2',
            title: 'Novo exame disponível',
            description: 'O resultado do seu exame de sangue já está disponível.',
            timestamp: new Date(now.getTime() - 45 * 60 * 1000), // há 45 minutos
            read: false,
          },
          {
            id: '3',
            title: 'Consulta reagendada',
            description: 'Sua consulta foi reagendada para amanhã às 14:30.',
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // há 2 horas
            read: true,
          },
          {
            id: '4',
            title: 'Lembrete de consulta',
            description: 'Você tem uma consulta marcada para hoje.',
            timestamp: new Date(now.getTime() - 26 * 60 * 60 * 1000), // ontem
            read: true,
          },
          {
            id: '5',
            title: 'Perfil atualizado',
            description: 'Suas informações de perfil foram atualizadas com sucesso.',
            timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
            read: true,
          },
          {
            id: '6',
            title: 'Bem-vindo ao sistema',
            description: 'Seu acesso ao sistema foi criado com sucesso.',
            timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 dias atrás
            read: true,
          },
        ],
      }),
    );
  }
}
