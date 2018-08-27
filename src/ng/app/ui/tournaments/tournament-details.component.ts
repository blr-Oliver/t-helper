import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {mergeMap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {UpdateManager} from '../../service/UpdateManager';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  tournament$: Observable<Tournament>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private updateManager: UpdateManager) {
  }

  ngOnInit(): void {
    this.tournament$ =
      this.route.paramMap.pipe(
        mergeMap(p => this.tournamentService.get(p.get('id')))
      );
  }

  onUpdate(subject: Tournament, property: string, newValue: any) {
    this.updateManager.registerUpdate({
      type: 'tournament',
      subject: subject.data,
      property: property,
      currentValue: newValue
    });
  }
}
