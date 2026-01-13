import { PacienteListItem } from '../models/PacienteListItem.model';

export interface PacientesState {
  pacientes: PacienteListItem[];
  loading: boolean;
  error: string | null;
}

export const initialPacientesState: PacientesState = {
  pacientes: [],
  loading: false,
  error: null,
};
