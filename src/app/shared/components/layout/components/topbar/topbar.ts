import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationMenu } from '../notification-menu/notification-menu';
import { ProfileMenu } from '../profile-menu/profile-menu';
import { Logo } from '../../../logo/logo';

@Component({
  selector: 'app-topbar',
  imports: [MatToolbarModule, MatIconModule, NotificationMenu, ProfileMenu, Logo],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  // config = inject(TopbarService).getConfig();
  @Output() menuToggle = new EventEmitter<void>();
}
