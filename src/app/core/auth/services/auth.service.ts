import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';
import { Observable, of, tap } from 'rxjs';
import { User } from '../models/User.model';
import * as CryptoJS from 'crypto-js';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private router = inject(Router);
  private sessionService = inject(SessionService);

  private readonly USERS_KEY = 'users';

  constructor() {
    this.seedUserIfNeeded();
  }

  login(email: string, password: string): Observable<User> {
    const users = this.storage.get<User[]>(this.USERS_KEY) || [];
    const passwordHash = this.hashPassword(password);

    const user = users.find((u) => u.email === email && u.passwordHash === passwordHash);

    if (!user) {
      throw new Error('Credenciais inválidas');
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

  private seedUserIfNeeded() {
    const users = this.storage.get<User[]>(this.USERS_KEY) ?? [];

    if (users.some((u) => u.email === 'user@teste.com')) return;

    const defaultUser: User = {
      id: '1',
      name: 'User Teste',
      email: 'user@teste.com',
      role: 'ADMIN',
      passwordHash: this.hashPassword('12345678'),
    };

    this.storage.set(this.USERS_KEY, [...users, defaultUser]);
  }
}
