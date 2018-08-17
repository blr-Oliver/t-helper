import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ExpandedTournamentDTO, TournamentDTO} from '../../model/dto/TournamentDTO';
import {map} from 'rxjs/operators';
import {TournamentPatchRequest} from './TournamentPatchRequest';
import {DTO} from '../../model/dto/DTO';

export interface TournamentLoader {
  getTournament(id: number): Observable<ExpandedTournamentDTO>;
  getAll(): Observable<TournamentDTO[]>;
}

export interface TournamentSaver {
  create(data: TournamentDTO): Observable<ExpandedTournamentDTO>;
  update<T extends DTO>(data: T): Observable<any>;
  patch(data: TournamentPatchRequest): Observable<any>;
  remove(id: number, securityToken: any): Observable<any>;
}

// TODO actually load the data instead of mocking with static json
@Injectable()
export class HttpTournamentLoader implements TournamentLoader {
  constructor(private http: HttpClient) {
  }

  getTournament(id: number): Observable<ExpandedTournamentDTO> {
    return this.http.get<ExpandedTournamentDTO>('/assets/data/sample-tournament.json');
  }

  getAll(): Observable<TournamentDTO[]> {
    return this.http.get<TournamentDTO>('/assets/data/sample-tournament.json').pipe(
      map(t => [t])
    );
  }
}
