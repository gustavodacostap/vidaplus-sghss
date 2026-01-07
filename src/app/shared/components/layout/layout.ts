import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  sidenavOpened = signal(false);

  toggleSidenav() {
    this.sidenavOpened.update((v) => !v);
  }

  closeSidenav() {
    this.sidenavOpened.set(false);
  }
}
