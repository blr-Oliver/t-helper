import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TournamentProvider} from '../../service/TournamentProvider';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {Pair} from '../../model/Pair';

@Component({
  templateUrl: './pairs.component.html'
})
export class PairsComponent implements OnInit {
  pairs$: Observable<Pair[]>;

  constructor(
    private tournamentService: TournamentProvider,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pairs$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.pairs)
    );
  }
}
