import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../service/tournament.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Tournament} from '../model/Tournament';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  templateUrl: './duels.component.html'
})
export class DuelsComponent implements OnInit {
  tournament$: Observable<Tournament>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tournament$ = this.route.parent.paramMap.pipe(
      map(params => params.get('id')),
      mergeMap(id => this.tournamentService.get(id))
    );
  }

}
