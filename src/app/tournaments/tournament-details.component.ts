import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {mergeMap} from 'rxjs/operators';
import {TournamentEntity} from '../model/TournamentEntity';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  tournament$: Observable<TournamentEntity>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tournament$ =
      this.route.paramMap.pipe(
        mergeMap(p => this.tournamentService.get(p.get('id')))
      );
  }
}
