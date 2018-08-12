import {TournamentDTO} from '../model/dto/TournamentDTO';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export interface TournamentLoader {
  getTournament(id: number): Observable<TournamentDTO>;
}

@Injectable()
export class HttpTournamentLoader implements TournamentLoader {
  constructor(private http: HttpClient) {
  }

  getTournament(id: number): Observable<TournamentDTO> {
    return this.http.get<TournamentDTO>('/assets/data/sample-tournament.json');
  }
}
