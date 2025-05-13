import { RaceModel } from '../models/race.model';
import { Component, input } from '@angular/core';
import { PonyComponent } from '../pony/pony.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pr-race',
  imports: [PonyComponent, DatePipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.css'
})
export class RaceComponent {
  readonly raceModel = input.required<RaceModel>();
}
