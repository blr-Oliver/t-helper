import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentProvider} from '../../service/TournamentProvider';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Game} from '../../model/Game';

@Component({
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {
  games$: Observable<Game[][]>;

  constructor(
    private tournamentService: TournamentProvider,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.games$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.games)
    );
  }
}
