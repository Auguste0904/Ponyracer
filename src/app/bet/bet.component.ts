import { Component, inject, Signal, signal } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { startWith, Subject, switchMap } from 'rxjs';
import { RaceService } from '../race.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FromNowPipe } from '../from-now.pipe';
import { PonyComponent } from '../pony/pony.component';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  imports: [FromNowPipe, PonyComponent, RouterModule],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.css'
})
export class BetComponent {
  raceModel: Signal<RaceModel | undefined> = signal(undefined);
  private readonly refreshSubject = new Subject<void>();
  readonly activatedRoute = inject(ActivatedRoute);
  readonly raceService = inject(RaceService);
  readonly raceId: number = parseInt(this.activatedRoute.snapshot.params['raceId']);
  betFailed = signal(false);

  constructor() {
    const route = inject(ActivatedRoute);
    const raceId = parseInt(route.snapshot.paramMap.get('raceId')!);
    this.raceModel = toSignal(
      this.refreshSubject.pipe(
        startWith(undefined),
        switchMap(() => this.raceService.get(raceId))
      )
    );
  }

  betOnPony(pony: PonyModel): void {
    this.betFailed.set(false);
    const result$ = this.isPonySelected(pony)
      ? this.raceService.cancelBet(this.raceModel()!.id)
      : this.raceService.bet(this.raceModel()!.id, pony.id);
    
    result$.subscribe({
      next: () => this.refreshSubject.next(),
      error: () => this.betFailed.set(true)
    })
  }

  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel()?.betPonyId;
  }

  resetBetFailed() {
    this.betFailed.set(false);
  }
}
