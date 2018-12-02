import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PipingStreamSupplier} from './PipingStreamSupplier';
import {map, switchMap} from 'rxjs/operators';
import {Tournament} from '../model/Tournament';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {Persister} from './persister/Persister';

@Injectable()
export class TournamentProvider {
  private streamSupplier: PipingStreamSupplier<number, Tournament>;

  constructor(@Inject('Persister') private persister: Persister) {
    this.streamSupplier = PipingStreamSupplier.create(
      switchMap(id => this.persister.getTournament(id)),
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

  getAll(): Observable<TournamentDTO[]> {
    return this.persister.getTournamentList();
  }
}
