import { Injectable, signal } from '@angular/core';
import { TopbarConfig } from '../models/TopbarConfig.model';

@Injectable({ providedIn: 'root' })
export class TopbarService {
  private config = signal<TopbarConfig | null>(null);

  set(config: TopbarConfig) {
    this.config.set(config);
  }

  getConfig() {
    return this.config.asReadonly();
  }
}
