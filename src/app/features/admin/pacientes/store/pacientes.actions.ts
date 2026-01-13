import { createAction, props } from '@ngrx/store';
import { PacienteListItem } from '../models/PacienteListItem.model';

export const loadPacientes = createAction('[Pacientes] Load');

export const loadPacientesSuccess = createAction(
  '[Pacientes] Load Success',
  props<{ pacientes: PacienteListItem[] }>(),
);

export const loadPacientesFailure = createAction(
  '[Pacientes] Load Failure',
  props<{ error: string }>(),
);
