import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {Game} from '../../model/Game';
import {map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './protocol-selector.component.html'
})
export class ProtocolSelectorComponent implements OnInit {
  games$: Observable<Game[][]>;
  mode: 'all' | 'choose' = 'choose';
  printBlanks = false;
  blanks = 1;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.games$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.games)
    );
  }
}
