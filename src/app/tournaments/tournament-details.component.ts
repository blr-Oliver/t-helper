import {Component, OnInit} from '@angular/core';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {switchMap} from 'rxjs/operators';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  tournament$: Observable<TournamentDTO>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tournament$ =
      this.route.paramMap.pipe(
        switchMap(p => this.tournamentService.getTournament(p.get('id')))
      );
  }
}
