import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {Observable} from 'rxjs';
import {GameSlotDTO} from '../model/dto/GameSlotDTO';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games$: Observable<GameSlotDTO[][]>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.games$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.schedule.games),
      map(function (allGames: GameSlotDTO[]): GameSlotDTO[][] {
        const sparsed = allGames.reduce(function (m: GameSlotDTO[][], game: GameSlotDTO) {
          const tour = game.tour, table = game.table;
          if (!(tour in m))
            m[tour] = [];
          m[tour][table] = game;
          return m;
        }, []);
        return sparsed.map(l => l.filter(x => x)).filter(x => x);
      })
    );

  }
}
