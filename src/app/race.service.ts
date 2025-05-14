import { Observable } from 'rxjs';
import { RaceModel } from './models/race.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  http = inject(HttpClient);

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>('https://ponyracer.ninja-squad.com/api/races', {
      params: { status: 'PENDING' }
    });
  }
}
