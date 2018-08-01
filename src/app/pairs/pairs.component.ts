import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TournamentService} from '../tournaments/tournament.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {PlayerDTO} from '../model/dto/PlayerDTO';

type PairDTO = [PlayerDTO, PlayerDTO];

@Component({
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})
export class PairsComponent implements OnInit {
  pairs$: Observable<PairDTO[]>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pairs$ = this.route.paramMap.pipe(
      switchMap(params => this.tournamentService.getTournament(params.get('id'))),
      map(function (t: TournamentDTO) {
        return Array(t.schedule.players.length / 2).fill(0).map(function (_, pairIndex): PairDTO {
          return [t.players[pairIndex * 2], t.players[pairIndex * 2 + 1]];
        });
      })
    );
  }

}
