import {Component, Inject, OnInit} from '@angular/core';
import {ConnectableObservable, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {mergeMap, publish, tap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {UpdateManager} from '../../service/UpdateManager';
import {HttpTournamentLoader} from '../../service/rest/tournament-loader.service';
import {ExpandedTournamentDTO} from '../../model/dto/TournamentDTO';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  tournament$: Observable<Tournament>;

  constructor(
    private tournamentService: TournamentService,
    private router: Router,
    private route: ActivatedRoute,
    private updateManager: UpdateManager,
    @Inject('TournamentLoader') private loader: HttpTournamentLoader) {
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

  create(tournament: Tournament) {
    const request = <ConnectableObservable<ExpandedTournamentDTO>> this.loader.create(tournament.data).pipe(
      tap(newTournament => this.router.navigate(['/', newTournament.id])),
      publish()
    );
    request.connect();
  }
}
