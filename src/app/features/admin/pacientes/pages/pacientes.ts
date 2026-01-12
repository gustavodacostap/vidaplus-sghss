import { Component, ViewChild, AfterViewInit, inject, OnInit, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { loadPacientes } from '../store/pacientes.actions';
import { selectPacientes } from '../store/pacientes.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Paciente } from '../models/Paciente.model';

@Component({
  selector: 'app-pacientes',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss',
})
export class Pacientes implements AfterViewInit, OnInit, OnDestroy {
  private store = inject(Store);
  private destroyed$ = new Subject<void>();

  displayedColumns = ['nome', 'cpf', 'dataNascimento', 'status'];
  allColumns = [...this.displayedColumns, 'actions'];

  columnLabels: Record<string, string> = {
    nome: 'Nome',
    cpf: 'CPF',
    dataNascimento: 'Data de Nascimento',
    status: 'Status',
  };

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.store.dispatch(loadPacientes());

    this.store
      .select(selectPacientes)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((patients) => {
        this.dataSource.data = patients.map((p) => {
          return {
            ...p,
            dataNascimento: new Date(p.dataNascimento).toLocaleDateString('pt-BR'),
          };
        });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewPaciente(paciente: Paciente) {
    console.log('Implementar viewPaciente' + paciente);
  }

  editPaciente(paciente: Paciente) {
    console.log('Implementar editPaciente' + paciente);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
