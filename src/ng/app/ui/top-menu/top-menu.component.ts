import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../service/tournament.service';
import {Observable} from 'rxjs';
import {RouteNameTracker} from '../../service/RouteNameTracker';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  tournamentId$: Observable<number>;
  expanded = false;
  nameTracker: RouteNameTracker;

  constructor(
    private tournamentService: TournamentService,
    nameTracker: RouteNameTracker) {
    this.nameTracker = nameTracker;
  }

  ngOnInit() {
    this.tournamentId$ = this.tournamentService.getCurrentId();
  }
}
