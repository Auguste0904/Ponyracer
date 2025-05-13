import { RaceModel } from '../models/race.model';
import { Component, input } from '@angular/core';

@Component({
  selector: 'pr-race',
  imports: [],
  templateUrl: './race.component.html',
  styleUrl: './race.component.css'
})
export class RaceComponent {
  raceModel = input.required<RaceModel>()
}
