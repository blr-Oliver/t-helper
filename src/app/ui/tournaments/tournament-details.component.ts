import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {mergeMap} from 'rxjs/operators';
import {Tournament} from '../../model/Tournament';
import {UpdateEvent} from '../../service/UpdateEvent';

@Component({
  templateUrl: './tournament-details.component.html'
})
export class TournamentDetailsComponent implements OnInit {
  tournament$: Observable<Tournament>;
  @Output() update: EventEmitter<UpdateEvent>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
    this.update = new EventEmitter<UpdateEvent>(false);
  }

  ngOnInit(): void {
    this.tournament$ =
      this.route.paramMap.pipe(
        mergeMap(p => this.tournamentService.get(p.get('id')))
      );
  }

  onUpdate(subject: Tournament, property: string, newValue: any) {
    this.update.emit({
      type: 'tournament',
      subject: subject.data,
      property: property,
      currentValue: newValue
    });
  }

}
