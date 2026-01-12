import { createAction, props } from '@ngrx/store';
import { Paciente } from '../models/Paciente.model';

export const loadPacientes = createAction('[Pacientes] Load');

export const loadPacientesSuccess = createAction(
  '[Pacientes] Load Success',
  props<{ pacientes: Paciente[] }>(),
);

export const loadPacientesFailure = createAction(
  '[Pacientes] Load Failure',
  props<{ error: string }>(),
);
