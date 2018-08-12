import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../service/tournament.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  tournamentId$: Observable<number>;

  constructor(private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.tournamentId$ = this.tournamentService.getCurrentId();
  }
}
