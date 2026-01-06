import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as authActions from './auth.actions';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state): AuthState => ({ ...state, loading: true })),
  on(
    authActions.loginSuccess,
    (state, { user }): AuthState => ({
      ...state,
      user,
      loading: false,
    }),
  ),
  on(
    authActions.loginFailure,
    (state, { error }): AuthState => ({
      ...state,
      error,
      loading: false,
    }),
  ),
  on(authActions.logout, (): AuthState => initialState),
);
