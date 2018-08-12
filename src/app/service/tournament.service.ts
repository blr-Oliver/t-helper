import {Inject, Injectable} from '@angular/core';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {Observable} from 'rxjs';
import {TournamentLoader} from './tournament-loader.service';
import {PipingStreamSupplier} from './PipingStreamSupplier';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class TournamentService {
  private streamSupplier: PipingStreamSupplier<number, TournamentDTO>;

  constructor(@Inject('TournamentLoader') private loader: TournamentLoader) {
    this.streamSupplier = PipingStreamSupplier.create<number, TournamentDTO>(
      switchMap(id => this.loader.getTournament(id))
    );
  }

  getCurrentId(): Observable<number> {
    return this.streamSupplier.getSourceStream();
  }

  getCurrent(): Observable<TournamentDTO> {
    return this.streamSupplier.getResultStream();
  }

  get(id: number | string) {
    return this.streamSupplier.getResultStream(+id);
  }
}
