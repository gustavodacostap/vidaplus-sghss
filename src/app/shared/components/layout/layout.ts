import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
