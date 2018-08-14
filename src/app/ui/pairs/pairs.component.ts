import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {TournamentService} from '../../service/tournament.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {Pair} from '../../model/Pair';
import {UpdateEvent} from '../../service/UpdateEvent';

@Component({
  templateUrl: './pairs.component.html'
})
export class PairsComponent implements OnInit {
  pairs$: Observable<Pair[]>;
  @Output() update: EventEmitter<UpdateEvent>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
    this.update = new EventEmitter<UpdateEvent>(false);
  }

  ngOnInit() {
    this.pairs$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.pairs)
    );
  }

  onUpdate(event: UpdateEvent) {
    this.update.emit(event);
  }
}
