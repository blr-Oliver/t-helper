import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {TournamentService} from '../../service/tournament.service';
import {Duel} from '../../model/Duel';

@Component({
  templateUrl: './duels.component.html',
  styleUrls: ['./duels.component.scss']
})
export class DuelsComponent implements OnInit {
  private static readonly DUEL_HEIGHT = 1.2;

  tournament$: Observable<Tournament>;
  selectedRow = 0;
  selectedColumn = 1;
  duelHeight = DuelsComponent.DUEL_HEIGHT;
  cellHeight: number;
  duelTotals: number[][];

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tournament$ = this.route.parent.paramMap.pipe(
      map(params => params.get('id')),
      mergeMap(id => this.tournamentService.get(id)),
      tap(t => this.cellHeight = t.duels[0][1].length * DuelsComponent.DUEL_HEIGHT),
      tap(t => this.duelTotals = this.computeTotals(t))
    );
  }

  computeTotals(tournament: Tournament): number[][] {
    const duels: Duel[][][] = tournament.duels;
    return duels.map((pairList, i) => {
      const pair = tournament.pairs[i];
      return pairList.map(
        duelList => (duelList || []).reduce(
          (sum, duel) => sum + duel.scores[duel.getPairIndex(pair)], 0));
    });
  }
}
