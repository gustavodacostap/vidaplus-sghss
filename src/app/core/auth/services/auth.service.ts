import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';
import { Observable, of, tap, throwError } from 'rxjs';
import { User } from '../models/User.model';
import * as CryptoJS from 'crypto-js';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { Paciente } from '../../../features/admin/pacientes/models/Paciente.model';
import { Profissionais } from '../../../features/admin/profissionais/pages/list/profissionais';
import { Profissional } from '../../../features/admin/profissionais/models/Profissional.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private router = inject(Router);
  private sessionService = inject(SessionService);

  private readonly USERS_KEY = 'users';
  private readonly PACIENTES_KEY = 'pacientes';
  private readonly PROFISSIONAIS_KEY = 'profissionais';

  constructor() {
    // this.storage.set(this.PACIENTES_KEY, this.createMockPatients());
    this.createMockProfissionais();
  }

  login(email: string, password: string): Observable<User> {
    const users = this.storage.get<User[]>(this.USERS_KEY) || [];
    const passwordHash = this.hashPassword(password);

    const user = users.find((u) => u.email === email && u.passwordHash === passwordHash);

    if (!user) {
      return throwError(() => new Error('Credenciais inválidas'));
    }

    const redirectMap = {
      ADMIN: '/admin/pacientes',
      PROFESSIONAL: '/profissional/agenda',
      PATIENT: '/paciente/consultas',
    };

    return of(user).pipe(
      tap(() => {
        this.sessionService.setSession({
          userId: user.id,
          role: user.role,
          name: user.name,
          token: this.generateToken(user),
        });

        this.router.navigateByUrl(redirectMap[user.role]);
      }),
    );
  }

  logout(): void {
    this.sessionService.clearSession();
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  generateToken(user: User): string {
    return btoa(
      JSON.stringify({
        sub: user.id,
        role: user.role,
        iat: Date.now(),
      }),
    );
  }

  // private seedUserIfNeeded() {
  //   const users = this.storage.get<User[]>(this.USERS_KEY) ?? [];

  //   if (users.some((u) => u.email === 'user@teste.com')) return;

  //   const defaultUser: User = {
  //     id: '1',
  //     name: 'User Teste',
  //     email: 'user@teste.com',
  //     role: 'ADMIN',
  //     passwordHash: this.hashPassword('12345678'),
  //   };

  //   this.storage.set(this.USERS_KEY, [...users, defaultUser]);
  // }

  private createMockProfissionais() {
    const mockProfissionais: Profissional[] = [
      {
        id: 1,
        userId: 1,
        nome: 'Dr. João Silva',
        crm: '123456',
        UFcrm: 'SP',
        celular: '11999999999',
        email: 'joao.silva@email.com',
        unidadeId: 1,
        especialidade: 'Cardiologia',
      },
      {
        id: 2,
        userId: 2,
        nome: 'Dra. Maria Oliveira',
        crm: '654321',
        UFcrm: 'RJ',
        celular: '21988887777',
        email: 'maria.oliveira@email.com',
        unidadeId: 1,
        especialidade: 'Pediatria',
      },
      {
        id: 3,
        userId: 3,
        nome: 'Dr. Carlos Santos',
        crm: '987654',
        UFcrm: 'MG',
        celular: '31977776666',
        email: 'carlos.santos@email.com',
        unidadeId: 2,
        especialidade: 'Ortopedia',
      },
    ];

    this.storage.set(this.PROFISSIONAIS_KEY, mockProfissionais);
  }

  // private createMockPatients(): Paciente[] {
  //   return [
  //     {
  //       id: 1,
  //       userId: 'u1',
  //       nome: 'João da Silva',
  //       dataNascimento: '1990-04-15',
  //       idade: 34,
  //       cpf: '12345678900',
  //       email: 'joao@email.com',
  //       celular: '11999999999',
  //       tipoSanguineo: 'O+',
  //       peso: 72.5,
  //       altura: 1.78,
  //       alergias: 'Dipirona',
  //     },
  //     {
  //       id: 2,
  //       userId: 'u2',
  //       nome: 'Maria Oliveira',
  //       dataNascimento: '1985-10-03',
  //       idade: 39,
  //       cpf: '98765432100',
  //       email: 'maria@email.com',
  //       celular: '11988888888',
  //       tipoSanguineo: 'A-',
  //       peso: 65.2,
  //       altura: 1.65,
  //       alergias: '',
  //     },
  //     {
  //       id: 3,
  //       userId: 'u3',
  //       nome: 'Carlos Pereira',
  //       dataNascimento: '2001-01-22',
  //       idade: 24,
  //       cpf: '45678912300',
  //       email: 'carlos@email.com',
  //       celular: '11977777777',
  //       tipoSanguineo: 'B+',
  //       peso: 80.0,
  //       altura: 1.82,
  //       alergias: 'Lactose, glúten',
  //     },
  //   ];
  // }
}
