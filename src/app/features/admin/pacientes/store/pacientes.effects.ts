import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PacientesService } from '../services/pacientes.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadPacientes, loadPacientesFailure, loadPacientesSuccess } from './pacientes.actions';

@Injectable()
export class PacientesEffects {
  private actions$ = inject(Actions);
  private service = inject(PacientesService);

  loadPacientes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPacientes),
      switchMap(() =>
        this.service.getPatients().pipe(
          map((pacientes) => loadPacientesSuccess({ pacientes })),
          catchError((err) => of(loadPacientesFailure({ error: err.message }))),
        ),
      ),
    );
  });
}
