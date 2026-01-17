import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../../features/auth/login/store/auth.effects';
import { authReducer } from '../../features/auth/login/store/auth.reducer';
import { AuthState } from '../../features/auth/login/store/auth.state';
import { uiReducer } from '../ui/store/ui.reducers';
import { UIState } from '../ui/store/ui.state';
import { PacientesState } from '../../features/admin/pacientes/store/pacientes.state';
import { pacientesReducer } from '../../features/admin/pacientes/store/pacientes.reducer';
import { PacientesEffects } from '../../features/admin/pacientes/store/pacientes.effects';
import { UIEffects } from '../ui/store/ui.effects';

export interface AppState {
  auth: AuthState;
  ui: UIState;
  pacientes: PacientesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  ui: uiReducer,
  pacientes: pacientesReducer,
};

export const effects = [AuthEffects, PacientesEffects, UIEffects];
