import {Component, OnInit} from '@angular/core';
import {Standings} from '../../model/Standings';
import {Observable} from 'rxjs';
import {TournamentProvider} from '../../service/TournamentProvider';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap, tap} from 'rxjs/operators';

@Component({
  templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit {
  standings$: Observable<Standings>;

  constructor(
    private tournamentService: TournamentProvider,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.standings$ = this.route.parent.paramMap.pipe(
      map(params => params.get('id')),
      mergeMap(id => this.tournamentService.get(id)),
      map(t => t.standings),
      tap(standings => standings.recompute())
    );
  }

}
