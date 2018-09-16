import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../../model/Game';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {TournamentService} from '../../service/tournament.service';

@Component({
  templateUrl: './protocol-list.component.html',
  styleUrls: ['./protocol-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProtocolListComponent implements OnInit {
  games$: Observable<Game[]>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.games$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.games),
      map(games => [].concat(...games))
    );
  }
}
