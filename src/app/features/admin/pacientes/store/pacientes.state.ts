import { Paciente } from '../models/Paciente.model';

export interface PacientesState {
  pacientes: Paciente[];
  loading: boolean;
  error: string | null;
}

export const initialPacientesState: PacientesState = {
  pacientes: [],
  loading: false,
  error: null,
};
