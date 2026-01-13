import { inject, Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';
import { PacienteListItem } from '../models/PacienteListItem.model';
import { StorageService } from '../../../../core/storage/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private readonly STORAGE_KEY = 'pacientes';
  private storage = inject(StorageService);

  getPatients(): Observable<PacienteListItem[]> {
    return defer(() => {
      const data = this.storage.get<PacienteListItem[]>(this.STORAGE_KEY);

      if (!data) {
        throw new Error('Nenhum paciente encontrado');
      }

      return of(data);
    });
  }
}
