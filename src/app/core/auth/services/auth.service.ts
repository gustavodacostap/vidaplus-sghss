import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../storage/storage.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);

  private readonly USERS_KEY = 'users';
  private readonly SESSION_KEY = 'session';

  login(email: string, password: string): Observable<User> {
    const users = this.storage.get<User[]>(this.USERS_KEY) || [];
    const passwordHash = this.hashPassword(password);

    const user = users.find((u) => u.email === email && u.passwordHash === passwordHash);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    this.storage.set(this.SESSION_KEY, {
      userId: user.id,
      role: user.role,
      token: this.generateToken(user),
    });

    return of(user);
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  getSession() {
    return this.storage.get<any>(this.SESSION_KEY);
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
      })
    );
  }
}
