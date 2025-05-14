import { RaceService } from './../race.service';
import { Component } from '@angular/core';
import { RaceComponent } from '../race/race.component';
import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-races',
  standalone: true,
  imports: [RaceComponent],
  templateUrl: './races.component.html',
  styleUrl: './races.component.css'
})
export class RacesComponent {
  races: Array<RaceModel> = [];

  constructor(private readonly RaceService: RaceService) {
    this.RaceService.list().subscribe((races: Array<RaceModel>) => (this.races = races));
  }
}
