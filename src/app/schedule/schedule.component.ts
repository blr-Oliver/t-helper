import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {GameEntity} from '../model/GameEntity';

@Component({
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {
  games$: Observable<GameEntity[][]>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.games$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.games)
    );
  }
}
