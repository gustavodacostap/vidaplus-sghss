import { Route } from '@angular/router';
import { TopbarConfig } from '../../core/ui/models/TopbarConfig.model';
import { UserRole } from '../../core/auth/models/User.model';

export interface AppRouteData {
  topbar?: TopbarConfig;
  roles?: UserRole[];
}

export function route(config: Route & { data?: AppRouteData }): Route {
  return config;
}
