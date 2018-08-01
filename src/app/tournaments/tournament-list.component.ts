import {Component, OnInit} from '@angular/core';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {TournamentService} from './tournament.service';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
  tournaments$: Observable<TournamentDTO[]>;

  constructor(
    private tournamentService: TournamentService
  ) {
  }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.getTournaments();
  }
}
