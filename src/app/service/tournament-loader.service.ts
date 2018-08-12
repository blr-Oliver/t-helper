import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ExpandedTournamentDTO} from '../model/dto/TournamentDTO';

export interface TournamentLoader {
  getTournament(id: number): Observable<ExpandedTournamentDTO>;
}

@Injectable()
export class HttpTournamentLoader implements TournamentLoader {
  constructor(private http: HttpClient) {
  }

  getTournament(id: number): Observable<ExpandedTournamentDTO> {
    return this.http.get<ExpandedTournamentDTO>('/assets/data/sample-tournament.json');
  }
}
