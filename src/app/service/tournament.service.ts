import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TournamentLoader} from './tournament-loader.service';
import {PipingStreamSupplier} from './PipingStreamSupplier';
import {map, switchMap} from 'rxjs/operators';
import {Tournament} from '../model/Tournament';

@Injectable()
export class TournamentService {
  private streamSupplier: PipingStreamSupplier<number, Tournament>;

  constructor(@Inject('TournamentLoader') private loader: TournamentLoader) {
    this.streamSupplier = PipingStreamSupplier.create(
      switchMap(id => this.loader.getTournament(id)),
      map(dto => new Tournament(dto))
    );
  }

  getCurrentId(): Observable<number> {
    return this.streamSupplier.getSourceStream();
  }

  getCurrent(): Observable<Tournament> {
    return this.streamSupplier.getResultStream();
  }

  get(id: number | string): Observable<Tournament> {
    return this.streamSupplier.getResultStream(+id);
  }
}
