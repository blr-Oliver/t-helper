import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {debounceTime, distinctUntilKeyChanged, mergeMap, skipWhile, tap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {UpdateManager} from '../../service/UpdateManager';
import {UpdateEvent} from '../../service/UpdateEvent';
import {TournamentDTO} from '../../model/dto/TournamentDTO';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  private static readonly DEBOUNCE_PROPERTIES: string[] = ['name', 'description'];
  private static readonly DEBOUNCE_DELAY = 600;

  tournament$: Observable<Tournament>;
  debounceBarriers: { [property: string]: Subject<UpdateEvent> };

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private updateManager: UpdateManager) {
  }

  ngOnInit(): void {
    this.tournament$ = this.route.paramMap.pipe(
      mergeMap(p => this.tournamentService.get(p.get('id'))),
      tap(tournament => this.initBarriers(tournament.data))
    );
  }

  onUpdate(subject: Tournament, property: string, newValue: any) {
    this.debounceBarriers[property].next({
      type: 'tournament',
      subject: subject.data,
      property: property,
      currentValue: newValue
    });
  }

  private initBarriers(tournament: TournamentDTO): void {
    const handler = (event: UpdateEvent) => this.updateManager.registerUpdate(event);
    this.debounceBarriers = TournamentDetailsComponent.DEBOUNCE_PROPERTIES.reduce((hash, property) => {
      const initial = tournament[property];
      hash[property] = new Subject<UpdateEvent>().pipe(
        debounceTime(TournamentDetailsComponent.DEBOUNCE_DELAY),
        distinctUntilKeyChanged('currentValue'),
        skipWhile(event => event.currentValue === initial)
      );
      hash[property].subscribe(handler);
      return hash;
    }, {});
  }
}
