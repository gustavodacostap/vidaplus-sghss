import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PacientesState } from './pacientes.state';

export const selectPacientesState = createFeatureSelector<PacientesState>('pacientes');

export const selectPacientes = createSelector(selectPacientesState, (s) => s.pacientes);

export const selectPatientsLoading = createSelector(selectPacientesState, (s) => s.loading);

export const selectPatientsError = createSelector(selectPacientesState, (s) => s.error);
