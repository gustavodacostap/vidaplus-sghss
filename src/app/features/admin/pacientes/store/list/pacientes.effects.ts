import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PacientesService } from '../../services/pacientes.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loadPacienteById,
  loadPacienteByIdFailure,
  loadPacienteByIdSuccess,
  loadPacientes,
  loadPacientesFailure,
  loadPacientesSuccess,
} from './pacientes.actions';
import { showSnackbar } from '../../../../../core/ui/store/ui.actions';

@Injectable()
export class PacientesEffects {
  private actions$ = inject(Actions);
  private service = inject(PacientesService);

  loadPacientes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPacientes),
      switchMap(() =>
        this.service.getPacientesTable().pipe(
          map((pacientes) => loadPacientesSuccess({ pacientes })),
          catchError((err) =>
            of(
              loadPacientesFailure(),
              showSnackbar({
                message: 'Erro ao carregar dados dos pacientes',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });

  loadPacienteById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPacienteById),
      switchMap(({ id }) =>
        this.service.getPacienteById(id).pipe(
          map((paciente) => loadPacienteByIdSuccess({ paciente })),
          catchError((err) =>
            of(
              loadPacienteByIdFailure(),
              showSnackbar({
                message: 'Paciente não encontrado',
                logMessage: err.toString(),
              }),
            ),
          ),
        ),
      ),
    );
  });
}
