import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {switchMap} from 'rxjs/operators';
import {ExpandedTournamentDTO} from '../model/dto/TournamentDTO';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  tournament$: Observable<ExpandedTournamentDTO>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tournament$ =
      this.route.paramMap.pipe(
        switchMap(p => this.tournamentService.get(p.get('id')))
      );
  }
}
