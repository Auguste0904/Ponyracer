import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { UserModel } from './models/user.model';

const USER_LOCAL_STORAGE_KEY = 'rememberMe';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly user = signal<UserModel | undefined>(this.retrieveUser());
  readonly currentUser = this.user.asReadonly();

  constructor() {
    effect(() => {
      // every time the user signal changes, we store it in local storage
      if (this.user()) {
        window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(this.user()));
      } else {
        window.localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      }
    });
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users`, body);
  }

  authenticate(login: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.baseUrl}/api/users/authentication`, { login, password })
      .pipe(tap(user => this.user.set(user)));
  }

  logout(): void {
    this.user.set(undefined);
  }

  private retrieveUser(): UserModel | undefined {
    const value = window.localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (value) {
      return JSON.parse(value) as UserModel;
    }
    return undefined;
  }
}
