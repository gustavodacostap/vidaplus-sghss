import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PacientesService } from '../../services/pacientes.service';

export interface ViewPacienteDialogData {
  pacienteId: number;
}

@Component({
  selector: 'app-view-paciente-dialog',
  imports: [],
  templateUrl: './view-paciente-dialog.html',
  styleUrl: './view-paciente-dialog.scss',
})
export class ViewPacienteDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<ViewPacienteDialog>);
  private pacientesService = inject(PacientesService);
  readonly data = inject<ViewPacienteDialogData>(MAT_DIALOG_DATA);

  paciente$!: Observable<any>;

  ngOnInit(): void {
    // this.paciente$ = this.pacientesService.getById(this.data.pacienteId);
  }

  close(): void {
    this.dialogRef.close();
  }
}
