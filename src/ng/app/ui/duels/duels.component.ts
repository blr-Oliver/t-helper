import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {TournamentService} from '../../service/tournament.service';

@Component({
  templateUrl: './duels.component.html',
  styleUrls: ['./duels.component.scss']
})
export class DuelsComponent implements OnInit {
  private static readonly DUEL_HEIGHT = 1.2;

  tournament$: Observable<Tournament>;
  selectedRow = 0;
  selectedColumn = 1;
  cellHeight: number;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tournament$ = this.route.parent.paramMap.pipe(
      map(params => params.get('id')),
      mergeMap(id => this.tournamentService.get(id)),
      tap(t => this.cellHeight = t.duels[0][1].length * DuelsComponent.DUEL_HEIGHT)
    );
  }

}
