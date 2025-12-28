import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as authActions from './auth.actions';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

// auth.effects.ts
@Injectable()
export class AuthEffects {
  private authService = inject(AuthService);
  private router = inject(Router);
  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((user) => authActions.loginSuccess({ user })),
          catchError((err) => of(authActions.loginFailure({ error: err.message })))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({ user }) => {
          if (user.role === 'ADMIN') this.router.navigate(['/admin']);
          if (user.role === 'PROFESSIONAL') this.router.navigate(['/dashboard']);
          if (user.role === 'PATIENT') this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );
}
