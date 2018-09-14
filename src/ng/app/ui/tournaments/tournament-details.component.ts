import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {mergeMap, tap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {UpdateManager} from '../../service/UpdateManager';
import {UpdateEvent} from '../../service/UpdateEvent';
import {TournamentDTO} from '../../model/dto/TournamentDTO';
import {UpdateEventDebounceBarrier} from '../../service/DebounceBarrier';
import {NgModel} from '@angular/forms';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  tournament$: Observable<Tournament>;
  debounceBarrier: UpdateEventDebounceBarrier<TournamentDTO>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private updateManager: UpdateManager) {
    this.debounceBarrier = new UpdateEventDebounceBarrier<TournamentDTO>(
      600,
      ['name', 'description'],
      (event: UpdateEvent) => this.updateManager.registerUpdate(event));
  }

  ngOnInit(): void {
    this.tournament$ = this.route.paramMap.pipe(
      mergeMap(p => this.tournamentService.get(p.get('id'))),
      tap(tournament => this.debounceBarrier.init(tournament.data))
    );
  }

  onUpdate(subject: Tournament, ngModel: NgModel, property: string) {
    if (ngModel.valid)
      this.debounceBarrier.next({
        type: 'tournament',
        subject: subject.data,
        property: property,
        currentValue: subject[property]
      });
  }
}
