import { PonyModel } from './../models/pony.model';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'pr-pony',
  imports: [],
  templateUrl: './pony.component.html',
  styleUrl: './pony.component.css'
})
export class PonyComponent {
  readonly ponyModel = input.required<PonyModel>();
  ponyClicked = output<PonyModel>();
  readonly ponyImageUrl = computed(() => `images/pony-${this.ponyModel().color.toLowerCase()}.gif`);
  readonly altIdentity = computed(() => this.ponyModel().name);

  onPonyClicked(): void {
    this.ponyClicked.emit(this.ponyModel());
  }
}
