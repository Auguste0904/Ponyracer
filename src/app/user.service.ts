import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserModel } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly user = signal<UserModel | undefined>(this.retrieveUser());
  public readonly currentUser = this.user.asReadonly();

  constructor() {
    effect(() => {
      if (this.user()) {
        localStorage.setItem('rememberMe', JSON.stringify(this.user()));
      } else {
        localStorage.removeItem('rememberMe');
      }
    });
  }

  private retrieveUser(): UserModel | undefined {
    const user = localStorage.getItem('rememberMe');
    return user ? JSON.parse(user) : undefined;
  }

  authenticate(login: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication', { login, password })
      .pipe(tap(user => this.user.set(user)));
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', body);
  }

  logout(): void {
    this.user.set(undefined);
  }
}
