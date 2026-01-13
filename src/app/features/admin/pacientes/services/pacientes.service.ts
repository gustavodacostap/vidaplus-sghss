import { inject, Injectable } from '@angular/core';
import { defer, Observable, of, throwError } from 'rxjs';
import { PacienteListItem } from '../models/PacienteListItem.model';
import { StorageService } from '../../../../core/storage/services/storage.service';
import { Paciente } from '../models/Paciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private readonly STORAGE_KEY = 'pacientes';
  private storage = inject(StorageService);

  private getStoredPacientes(): Paciente[] {
    const data = this.storage.get<Paciente[]>(this.STORAGE_KEY);

    if (!data) {
      return [];
    }

    return data;
  }

  getPacientesTable(): Observable<PacienteListItem[]> {
    return defer(() => {
      const pacientes = this.getStoredPacientes();

      const listItems: PacienteListItem[] = pacientes.map((p) => ({
        id: p.id,
        nome: p.nome,
        cpf: p.cpf,
        dataNascimento: p.dataNascimento,
        status: p.status,
      }));

      return of(listItems);
    });
  }

  getPacienteById(id: number): Observable<Paciente> {
    return defer(() => {
      const pacientes = this.getStoredPacientes();

      const paciente = pacientes.find((p) => p.id === id);

      if (!paciente) {
        return throwError(() => new Error(`Paciente com id ${id} não encontrado`));
      }

      return of(paciente);
    });
  }
}
