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
  on(authActions.login, (state) => ({ ...state, loading: true })),
  on(authActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(authActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(authActions.logout, () => initialState)
);
