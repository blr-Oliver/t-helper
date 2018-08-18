import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ExpandedTournamentDTO, TournamentDTO} from '../../model/dto/TournamentDTO';
import {TournamentPatchRequest} from './TournamentPatchRequest';
import {DTO} from '../../model/dto/DTO';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';

export interface TournamentLoader {
  getTournament(id: number): Observable<ExpandedTournamentDTO>;
  getAll(): Observable<TournamentDTO[]>;
  saveProtocol(tour: number, table: number, protocol: ProtocolDTO): Observable<any>;
}

export interface TournamentSaver {
  create(data: TournamentDTO): Observable<ExpandedTournamentDTO>;
  update<T extends DTO>(data: T): Observable<any>;
  patch(data: TournamentPatchRequest): Observable<any>;
  remove(id: number, securityToken: any): Observable<any>;
}

@Injectable()
export class HttpTournamentLoader implements TournamentLoader {
  constructor(private http: HttpClient) {
  }

  getTournament(id: number): Observable<ExpandedTournamentDTO> {
    return this.http.get<ExpandedTournamentDTO>(`/api/tournaments/${id}`);
  }

  getAll(): Observable<TournamentDTO[]> {
    return this.http.get<TournamentDTO[]>('/api/tournaments');
  }

  saveProtocol(tour: number, table: number, protocol: ProtocolDTO): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(
      `/api/tournaments/${protocol.tid}/games/${tour}/${table}`,
      protocol,
      {
        observe: 'response'
      });
  }
}
