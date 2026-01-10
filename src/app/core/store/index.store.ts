import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../../features/auth/login/store/auth.effects';
import { authReducer } from '../../features/auth/login/store/auth.reducer';
import { AuthState } from '../../features/auth/login/store/auth.state';
import { uiReducer } from '../ui/store/ui.reducers';
import { UIState } from '../ui/store/ui.state';

export interface AppState {
  auth: AuthState;
  ui: UIState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
  // userInterface: userInterfaceReducer,
};

export const effects = [AuthEffects];
