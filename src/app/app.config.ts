import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { effects, reducers } from './core/store/index.store';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorPtBrIntl } from './shared/providers/paginator-ptbr-intl';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MatPaginatorIntl, useClass: PaginatorPtBrIntl },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects(effects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideEnvironmentNgxMask(),
  ],
};
