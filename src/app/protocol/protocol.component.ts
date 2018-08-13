import {Component, OnInit} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {GameEntity} from '../model/entity/GameEntity';

@Component({
  templateUrl: './protocol.component.html'
})
export class ProtocolComponent implements OnInit {
  protocol$: Observable<GameEntity>;
  gameId: string;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.protocol$ = zip(this.route.parent.paramMap, this.route.paramMap).pipe(
      tap((twoMaps) => this.tournamentService.get(twoMaps[0].get('id'))),
      map(twoMaps => twoMaps[1]),
      tap(params => this.gameId = `game-${params.get('tour')}-${params.get('table')}`),
      mergeMap(params => this.tournamentService.getCurrent().pipe(
        map(t => t.games[+params.get('tour') - 1][+params.get('table') - 1]))
      )
    );
  }
}
