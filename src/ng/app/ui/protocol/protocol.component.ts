import {Component, OnInit} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Game} from '../../model/Game';
import {UpdateEvent} from '../../service/UpdateEvent';
import {UpdateManager} from '../../service/UpdateManager';

@Component({
  templateUrl: './protocol.component.html'
})
export class ProtocolComponent implements OnInit {
  game$: Observable<Game>;
  gameId: string;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private updateManager: UpdateManager) {
  }

  ngOnInit() {
    let tour = 1, table = 1;
    this.game$ = zip(this.route.parent.paramMap, this.route.paramMap).pipe(
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

  onUpdate(game: Game, change: UpdateEvent) {
    this.updateManager.registerUpdate({
      type: 'protocol',
      subject: game.protocol.data,
      property: change.type,
      currentValue: change.currentValue
    });
  }
}
