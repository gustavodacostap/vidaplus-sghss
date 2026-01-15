import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../models/Paciente.model';
import { Store } from '@ngrx/store';
import { selectPaciente } from '../../store/list/pacientes.selectors';
import { loadPacienteById } from '../../store/list/pacientes.actions';

@Component({
  selector: 'app-pacientes-edit',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './pacientes-edit.html',
  styleUrl: './pacientes-edit.scss',
})
export class PacientesEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  paciente: Signal<Paciente | null> = this.store.selectSignal(selectPaciente);

  pacienteId!: number;

  ngOnInit() {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));

    this.store.dispatch(loadPacienteById({ id: this.pacienteId }));
  }

  backToPacientes() {
    this.router.navigate(['admin/pacientes']);
  }
}
