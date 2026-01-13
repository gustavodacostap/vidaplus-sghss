import { Component, ViewChild, AfterViewInit, inject, OnInit, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { loadPacientes } from '../store/pacientes.actions';
import { selectPacientes } from '../store/pacientes.selectors';
import { combineLatest, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { PacienteListItem } from '../models/PacienteListItem.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewPacienteDialog } from '../dialogs/view-paciente-dialog/view-paciente-dialog';

type PacienteColumn = keyof Pick<PacienteListItem, 'nome' | 'cpf' | 'dataNascimento' | 'status'>;

@Component({
  selector: 'app-pacientes',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatAutocompleteModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss',
})
export class Pacientes implements AfterViewInit, OnInit, OnDestroy {
  private store = inject(Store);
  private destroyed$ = new Subject<void>();
  private dialog = inject(MatDialog);

  displayedColumns: PacienteColumn[] = ['nome', 'cpf', 'dataNascimento', 'status'];

  allColumns = [...this.displayedColumns, 'actions'];

  columnLabels: Record<string, string> = {
    nome: 'Nome',
    cpf: 'CPF',
    dataNascimento: 'Data de Nascimento',
    status: 'Status',
  };

  columnFormatters: Partial<
    Record<keyof PacienteListItem, (value: any, row: PacienteListItem) => string>
  > = {
    status: (value: boolean) => (value ? 'Ativo' : 'Inativo'),
  };

  unidades = ['Alphaville', 'Barueri', 'Osasco'];
  filteredUnidades$!: Observable<string[]>;

  nomeCtrl = new FormControl('');
  cpfCtrl = new FormControl('', [Validators.maxLength(14)]);

  dataSource = new MatTableDataSource<PacienteListItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.store.dispatch(loadPacientes());

    this.store
      .select(selectPacientes)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((pacientes) => {
        this.dataSource.data = pacientes;
      });

    this.dataSource.filterPredicate = (data, filter) => {
      const { nome, cpf } = JSON.parse(filter);

      return (
        (!nome || data.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (!cpf || data.cpf.includes(cpf))
      );
    };

    combineLatest([
      this.nomeCtrl.valueChanges.pipe(startWith('')),
      this.cpfCtrl.valueChanges.pipe(startWith('')),
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([nome, cpf]) => {
        this.dataSource.filter = JSON.stringify({
          nome: nome ?? '',
          cpf: cpf ?? '',
        });

        this.dataSource.paginator?.firstPage();
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewPaciente(pacienteId: number): void {
    this.dialog.open(ViewPacienteDialog, {
      width: '600px',
      data: { pacienteId },
    });
  }

  editPaciente(paciente: PacienteListItem) {
    console.log('Implementar editPaciente' + paciente);
  }

  formatCell(column: keyof PacienteListItem, row: PacienteListItem): string {
    const formatter = this.columnFormatters[column];
    const value = row[column];

    return formatter ? formatter(value, row) : String(value ?? '');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
