import { createReducer, on } from '@ngrx/store';
import { initialPacientesState } from './pacientes.state';
import { loadPacientes, loadPacientesFailure, loadPacientesSuccess } from './pacientes.actions';
import { PacientesState } from './pacientes.state';

export const pacientesReducer = createReducer(
  initialPacientesState,

  on(
    loadPacientes,
    (state): PacientesState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),

  on(
    loadPacientesSuccess,
    (state, { pacientes }): PacientesState => ({
      ...state,
      pacientes,
      loading: false,
    }),
  ),

  on(
    loadPacientesFailure,
    (state, { error }): PacientesState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
