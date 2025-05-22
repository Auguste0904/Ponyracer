import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-live',
  imports: [],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent {
  private readonly raceService = inject(RaceService);
  readonly raceModel = signal<RaceModel | undefined>(undefined);
  constructor() {
    const route = inject(ActivatedRoute);
    const raceId = parseInt(route.snapshot.paramMap.get('raceId')!);

    this.raceService.get(raceId).subscribe(race => this.raceModel.set(race));
  }
}
