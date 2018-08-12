import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TournamentLoader} from './tournament-loader.service';
import {PipingStreamSupplier} from './PipingStreamSupplier';
import {switchMap} from 'rxjs/operators';
import {ExpandedTournamentDTO} from '../model/dto/TournamentDTO';

@Injectable()
export class TournamentService {
  private streamSupplier: PipingStreamSupplier<number, ExpandedTournamentDTO>;

  constructor(@Inject('TournamentLoader') private loader: TournamentLoader) {
    this.streamSupplier = PipingStreamSupplier.create<number, ExpandedTournamentDTO>(
      switchMap(id => this.loader.getTournament(id))
    );
  }

  getCurrentId(): Observable<number> {
    return this.streamSupplier.getSourceStream();
  }

  getCurrent(): Observable<ExpandedTournamentDTO> {
    return this.streamSupplier.getResultStream();
  }

  get(id: number | string) {
    return this.streamSupplier.getResultStream(+id);
  }
}
