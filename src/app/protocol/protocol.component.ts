import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {map, mergeMap} from 'rxjs/operators';
import {GameEntity} from '../model/entity/GameEntity';

@Component({
  templateUrl: './protocol.component.html'
})
export class ProtocolComponent implements OnInit {
  protocol$: Observable<GameEntity>;
  private tournamentId: number;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const self = this;
    this.route.parent.paramMap.subscribe(params => this.tournamentId = +params.get('id'));
    this.protocol$ = this.route.paramMap.pipe(
      mergeMap(function (params) {
        const tour = +params.get('tour'), table = +params.get('table');
        return self.tournamentService.get(self.tournamentId).pipe(
          map(t => t.games[tour - 1][table - 1])
        );
      })
    );
  }
}
