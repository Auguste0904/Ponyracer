import { inject, Injectable } from '@angular/core';
import { UserModel } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  authenticate(login: string, password: string): Observable<UserModel> {
    const url = `https://ponyracer.ninja-squad.com/api/users/authentication`;

    return this.http.post<UserModel>(url, { login, password });
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const url = `https://ponyracer.ninja-squad.com/api/users`;

    return this.http.post<UserModel>(url, { login, password, birthYear });
  }
}
