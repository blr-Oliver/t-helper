import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TournamentService} from '../service/tournament.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {PairEntity} from '../model/entity/PairEntity';

@Component({
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})
export class PairsComponent implements OnInit {
  pairs$: Observable<PairEntity[]>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pairs$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.pairs)
    );
  }

}
