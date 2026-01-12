import { Component } from '@angular/core';

export interface ViewPacienteDialogData {
  pacienteId: number;
}

@Component({
  selector: 'app-view-paciente-dialog',
  imports: [],
  templateUrl: './view-paciente-dialog.html',
  styleUrl: './view-paciente-dialog.scss',
})
export class ViewPacienteDialog {}
