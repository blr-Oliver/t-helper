import {Inject, Injectable} from '@angular/core';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {Observable} from 'rxjs';
import {TournamentLoader} from './tournament-loader.service';

@Injectable()
export class TournamentService {
  constructor(@Inject('TournamentLoader') private loader: TournamentLoader) {
  }

  getTournaments(): Observable<TournamentDTO[]> {
    // return of(sample);
    return null;
  }

  getTournament(id: string | number): Observable<TournamentDTO> {
    console.log(`requested tournament with [id=${id}]`);
    return this.loader.getTournament(+id);
  }
}
