import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TournamentLoader} from './tournament-loader.service';
import {PipingStreamSupplier} from './PipingStreamSupplier';
import {map, switchMap} from 'rxjs/operators';
import {TournamentEntity} from '../model/entity/TournamentEntity';

@Injectable()
export class TournamentService {
  private streamSupplier: PipingStreamSupplier<number, TournamentEntity>;

  constructor(@Inject('TournamentLoader') private loader: TournamentLoader) {
    this.streamSupplier = PipingStreamSupplier.create(
      switchMap(id => this.loader.getTournament(id)),
      map(dto => new TournamentEntity(dto))
    );
  }

  getCurrentId(): Observable<number> {
    return this.streamSupplier.getSourceStream();
  }

  getCurrent(): Observable<TournamentEntity> {
    return this.streamSupplier.getResultStream();
  }

  get(id: number | string): Observable<TournamentEntity> {
    return this.streamSupplier.getResultStream(+id);
  }
}
