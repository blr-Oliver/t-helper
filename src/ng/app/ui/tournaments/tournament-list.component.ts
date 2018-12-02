import {Component, OnInit} from '@angular/core';
import {TournamentProvider} from '../../service/TournamentProvider';
import {Observable} from 'rxjs';
import {TournamentDTO} from '../../model/dto/TournamentDTO';

@Component({
  templateUrl: './tournament-list.component.html'
})
export class TournamentListComponent implements OnInit {
  tournaments$: Observable<TournamentDTO[]>;

  constructor(
    private tournamentService: TournamentProvider
  ) {
  }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.getAll();
  }
}
