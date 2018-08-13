import {Component, OnInit} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Game} from '../../model/Game';

@Component({
  templateUrl: './protocol.component.html'
})
export class ProtocolComponent implements OnInit {
  protocol$: Observable<Game>;
  gameId: string;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    let tour = 1, table = 1;
    this.protocol$ = zip(this.route.parent.paramMap, this.route.paramMap).pipe(
      tap((twoMaps) => this.tournamentService.get(twoMaps[0].get('id'))),
      map(twoMaps => twoMaps[1]),
      mergeMap(params => {
        tour = +params.get('tour') || tour;
        table = +params.get('table') || table;
        this.gameId = `game-${tour}-${table}`;
        return this.tournamentService.getCurrent();
      }),
      map(t => t.games[tour - 1][table - 1])
    );
  }
}
