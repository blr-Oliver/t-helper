import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../service/tournament.service';
import {Observable} from 'rxjs';
import {TournamentDTO} from '../../model/dto/TournamentDTO';

@Component({
  templateUrl: './tournament-list.component.html'
})
export class TournamentListComponent implements OnInit {
  tournaments$: Observable<TournamentDTO[]>;

  constructor(
    private tournamentService: TournamentService
  ) {
  }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.getAll();
  }
}
