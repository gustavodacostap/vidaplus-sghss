import { createReducer, on } from '@ngrx/store';
import { initialPacientesState } from './pacientes.state';
import {
  loadPacienteById,
  loadPacienteByIdFailure,
  loadPacienteByIdSuccess,
  loadPacientes,
  loadPacientesFailure,
  loadPacientesSuccess,
} from './pacientes.actions';
import { PacientesState } from './pacientes.state';

export const pacientesReducer = createReducer(
  initialPacientesState,

  on(
    loadPacientes,
    (state): PacientesState => ({
      ...state,
      loading: true,
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
  on(
    loadPacienteById,
    (state): PacientesState => ({
      ...state,
      loading: true,
    }),
  ),

  on(
    loadPacienteByIdSuccess,
    (state, { paciente }): PacientesState => ({
      ...state,
      paciente,
      loading: false,
    }),
  ),

  on(
    loadPacienteByIdFailure,
    (state, { error }): PacientesState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
