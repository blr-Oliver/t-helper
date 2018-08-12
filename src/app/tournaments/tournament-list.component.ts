import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../service/tournament.service';
import {Observable, of} from 'rxjs';
import {ExpandedTournamentDTO} from '../model/dto/TournamentDTO';

@Component({
  templateUrl: './tournament-list.component.html'
})
export class TournamentListComponent implements OnInit {
  tournaments$: Observable<ExpandedTournamentDTO[]>;

  constructor(
    private tournamentService: TournamentService
  ) {
  }

  ngOnInit() {
    // this.tournaments$ = this.tournamentService.getTournaments();
    this.tournaments$ = of([]);
  }
}
