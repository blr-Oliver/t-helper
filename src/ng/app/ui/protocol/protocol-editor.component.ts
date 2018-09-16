import {Component, OnInit} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Game} from '../../model/Game';
import {UpdateEvent} from '../../service/UpdateEvent';
import {UpdateManager} from '../../service/UpdateManager';
import {UpdateEventDebounceBarrier} from '../../service/DebounceBarrier';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';

@Component({
  templateUrl: './protocol-editor.component.html'
})
export class ProtocolEditorComponent implements OnInit {
  game$: Observable<Game>;
  gameId: string;
  private debounceBarrier: UpdateEventDebounceBarrier<ProtocolDTO>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private updateManager: UpdateManager) {
    this.debounceBarrier = new UpdateEventDebounceBarrier<ProtocolDTO>(
      600,
      ['tricks', 'level'],
      event => this.updateManager.registerUpdate(event)
    );
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
      map(t => t.games[tour - 1][table - 1]),
      tap(game => this.debounceBarrier.init(game.protocol.data))
    );
  }

  onUpdate(game: Game, event: UpdateEvent) {
    this.debounceBarrier.next({
      type: 'protocol',
      subject: game.protocol.data,
      property: event.type,
      currentValue: event.currentValue
    });
  }
}
