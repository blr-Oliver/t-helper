import {Component, OnInit} from '@angular/core';
import {Standings} from '../../model/Standings';
import {Observable} from 'rxjs';
import {TournamentService} from '../../service/tournament.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  standings$: Observable<Standings>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.standings$ = this.route.parent.paramMap.pipe(
      map(params => params.get('id')),
      mergeMap(id => this.tournamentService.get(id)),
      map(t => t.standings)
    );
  }

}
