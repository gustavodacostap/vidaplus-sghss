import { Component, inject, OnInit, Signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MatDialogClose,
} from '@angular/material/dialog';
import { PacientesService } from '../../services/pacientes.service';
import { Store } from '@ngrx/store';
import { Paciente } from '../../models/Paciente.model';
import { loadPacienteById } from '../../store/pacientes.actions';
import { MatButtonModule } from '@angular/material/button';
import { CpfPipe } from '../../../../../shared/pipes/cpf.pipe';
import { CelularPipe } from '../../../../../shared/pipes/celular.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { ListAndPipe } from '../../../../../shared/pipes/list-and.pipe';
import { selectPaciente } from '../../store/pacientes.selectors';
import { MatIconModule } from '@angular/material/icon';

export interface ViewPacienteDialogData {
  pacienteId: number;
}

@Component({
  selector: 'app-view-paciente-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatDialogTitle,
    CpfPipe,
    CelularPipe,
    MatDividerModule,
    ListAndPipe,
    MatIconModule,
  ],
  templateUrl: './view-paciente-dialog.html',
  styleUrl: './view-paciente-dialog.scss',
})
export class ViewPacienteDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<ViewPacienteDialog>);
  private pacientesService = inject(PacientesService);
  private store = inject(Store);
  readonly data = inject<ViewPacienteDialogData>(MAT_DIALOG_DATA);

  paciente: Signal<Paciente | null> = this.store.selectSignal(selectPaciente);

  ngOnInit(): void {
    this.store.dispatch(loadPacienteById({ id: this.data.pacienteId }));
  }

  close(): void {
    this.dialogRef.close();
  }
}
