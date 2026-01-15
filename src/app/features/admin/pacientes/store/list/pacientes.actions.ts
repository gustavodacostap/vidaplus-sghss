import { createAction, props } from '@ngrx/store';
import { PacienteListItem } from '../../models/PacienteListItem.model';
import { Paciente } from '../../models/Paciente.model';

export const loadPacientes = createAction('[Pacientes] Load');

export const loadPacientesSuccess = createAction(
  '[Pacientes] Load Success',
  props<{ pacientes: PacienteListItem[] }>(),
);

export const loadPacientesFailure = createAction('[Pacientes] Load Failure');

export const loadPacienteById = createAction('[Paciente Detail] Load', props<{ id: number }>());

export const loadPacienteByIdSuccess = createAction(
  '[Paciente Detail] Load Success',
  props<{ paciente: Paciente }>(),
);

export const loadPacienteByIdFailure = createAction('[Paciente Detail] Load Failure');
