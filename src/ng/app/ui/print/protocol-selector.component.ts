import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentProvider} from '../../service/TournamentProvider';
import {Game} from '../../model/Game';
import {debounceTime, distinctUntilChanged, map, mergeMap, skipWhile, tap} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import {ProtocolSelectionParser} from '../../service/ProtocolSelectionParser';

@Component({
  templateUrl: './protocol-selector.component.html'
})
export class ProtocolSelectorComponent implements OnInit, OnDestroy {
  games$: Observable<Game[][]>;
  mode: 'all' | 'type' | 'choose' = 'all';
  selectedGames: boolean[][];
  printBlanks = false;
  blanks = 1;

  private debounceBarrier: Subject<string>;
  private debounceSubscription: Subscription;

  constructor(
    private tournamentService: TournamentProvider,
    private route: ActivatedRoute,
    private parser: ProtocolSelectionParser) {
    this.debounceBarrier = new Subject<string>();
    this.debounceSubscription = this.debounceBarrier.pipe(
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

  ngOnDestroy(): void {
    this.debounceSubscription.unsubscribe();
  }

  onSelectionTyped(value: string) {
    this.debounceBarrier.next(value);
  }

  private parseTypedSelection(value: string) {
    this.parser.parse(value, this.selectedGames);
  }

}
