import { Paciente } from '../models/Paciente.model';
import { PacienteListItem } from '../models/PacienteListItem.model';

export interface PacientesState {
  pacientes: PacienteListItem[];
  paciente: Paciente | null;
  loading: boolean;
  error: string | null;
}

export const initialPacientesState: PacientesState = {
  pacientes: [],
  paciente: null,
  loading: false,
  error: null,
};
