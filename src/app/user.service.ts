import { inject, Injectable } from '@angular/core';
import { UserModel } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tu peux mettre le champ comme private (c'est généralement ce qu'on essaye de faire)
  // voire meme readonly (puisque les choses qu'on injecte a la construction ne changent pas ensuite)
  http = inject(HttpClient);

  authenticate(login: string, password: string): Observable<UserModel> {
    const url = `https://ponyracer.ninja-squad.com/api/users/authentication`;

    return this.http.post<UserModel>(url, { login, password });
  }
}
