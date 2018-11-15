import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PipingStreamSupplier} from './PipingStreamSupplier';
import {map, switchMap} from 'rxjs/operators';
import {Tournament} from '../model/Tournament';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {RestAPIFacade} from './api/RestAPIFacade';

@Injectable()
export class TournamentService {
  private streamSupplier: PipingStreamSupplier<number, Tournament>;

  constructor(private apiFacade: RestAPIFacade) {
    this.streamSupplier = PipingStreamSupplier.create(
      switchMap(id => this.apiFacade.getTournament(id)),
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
    return this.apiFacade.getTournamentList();
  }
}
