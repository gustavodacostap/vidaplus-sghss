import { Component, ViewChild, AfterViewInit, inject, OnInit, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { USDateToBR } from '../../../../../shared/utils/date.utils';
import { formatCpf } from '../../../../../shared/utils/field-formatters.util';
import { MatSelectModule } from '@angular/material/select';
import { ProfissionalListItem } from '../../models/ProfissionalListItem.model';
import {
  selectProfissionais,
  selectProfissionaisError,
  selectProfissionaisLoading,
} from '../../store/profissionais.selectors';
import { loadProfissionais } from '../../store/profissionais.actions';

type ProfissionalColumn = 'nome' | 'crm' | 'especialidade' | 'unidade';

@Component({
  selector: 'app-profissionais',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profissionais.html',
  styleUrl: './profissionais.scss',
})
export class Profissionais implements OnInit, AfterViewInit, OnDestroy {
  private store = inject(Store);
  private destroyed$ = new Subject<void>();
  private dialog = inject(MatDialog);
  private router = inject(Router);

  loading = this.store.selectSignal(selectProfissionaisLoading);
  error = this.store.selectSignal(selectProfissionaisError);

  displayedColumns: ProfissionalColumn[] = ['nome', 'crm', 'especialidade', 'unidade'];

  allColumns = [...this.displayedColumns, 'actions'];

  columnLabels: Record<string, string> = {
    nome: 'Nome',
    crm: 'CRM',
    especialidade: 'Especialidade',
    unidade: 'Unidade',
  };

  // columnFormatters: Partial<
  //   Record<keyof ProfissionalColumn, (value: any, row: ProfissionalListItem) => string>
  // > = {
  //   nome: (value: boolean) => (value ? 'Ativo' : 'Inativo'),
  //   dataNascimento: (value: string) => USDateToBR(value),
  //   cpf: (value: string) => formatCpf(value),
  // };

  filteredUnidades$!: Observable<string[]>;

  nomeCtrl = new FormControl('');
  cpfCtrl = new FormControl('', [Validators.maxLength(14)]);

  dataSource = new MatTableDataSource<ProfissionalListItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.store.dispatch(loadProfissionais());

    this.store
      .select(selectProfissionais)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((profissionais) => {
        console.log('Profissionais do store:', profissionais);
        this.dataSource.data = profissionais;
        this.dataSource.filter = '';
      });

    // this.dataSource.filterPredicate = (data, filter) => {
    //   const { nome, cpf } = JSON.parse(filter);

    //   return (
    //     (!nome || data.nome.toLowerCase().includes(nome.toLowerCase())) &&
    //     (!cpf || data.cpf.includes(cpf))
    //   );
    // };

    // combineLatest([
    //   this.nomeCtrl.valueChanges.pipe(startWith('')),
    //   this.cpfCtrl.valueChanges.pipe(startWith('')),
    // ])
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe(([nome, cpf]) => {
    //     this.dataSource.filter = JSON.stringify({
    //       nome: nome ?? '',
    //       cpf: cpf ?? '',
    //     });

    //     this.dataSource.paginator?.firstPage();
    //   });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewProfissional(profissionalId: number): void {
    // this.dialog.open(ViewPacienteDialog, {
    // width: '600px',
    // data: { profissionalId },
    // });
    // Implementar
  }

  editProfissional(profissionalId: number) {
    this.router.navigate([`admin/profissionais/edit/${profissionalId}`]);
  }

  // formatCell(column: keyof ProfissionalColumn, row: ProfissionalListItem): string {
  //   const formatter = this.columnFormatters[column];
  //   const value = row[column];

  //   return formatter ? formatter(value, row) : String(value ?? '');
  // }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
