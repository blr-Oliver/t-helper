import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {TournamentService} from '../../service/tournament.service';

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
