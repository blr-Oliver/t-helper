import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../../service/tournament.service';
import {Game} from '../../model/Game';
import {debounceTime, distinctUntilChanged, map, mergeMap, skipWhile, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ProtocolSelectionParserService} from '../../service/protocol-selection-parser.service';

@Component({
  templateUrl: './protocol-selector.component.html'
})
export class ProtocolSelectorComponent implements OnInit {
  games$: Observable<Game[][]>;
  mode: 'all' | 'type' | 'choose' = 'type';
  selectedGames: boolean[][];
  printBlanks = false;
  blanks = 1;

  private debounceBarrier: Subject<string>;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private parser: ProtocolSelectionParserService) {
    this.debounceBarrier = new Subject<string>();
    this.debounceBarrier.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      skipWhile(x => typeof(x) !== 'string' || !x.trim())
    ).subscribe(value => this.parseTypedSelection(value));
  }

  ngOnInit(): void {
    this.games$ = this.route.parent.paramMap.pipe(
      mergeMap(params => this.tournamentService.get(params.get('id'))),
      map(t => t.games),
      tap(games => this.selectedGames = games.map(tour => Array(tour.length).fill(true)))
    );
  }

  onSelectionTyped(value: string) {
    this.debounceBarrier.next(value);
  }

  private parseTypedSelection(value: string) {
    this.parser.parse(value, this.selectedGames);
  }
}
