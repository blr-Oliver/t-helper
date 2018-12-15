import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ExpandedTournamentDTO, TournamentDTO} from '../../model/dto/TournamentDTO';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';
import {PlayerDTO} from '../../model/dto/PlayerDTO';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';
import {TournamentPatchRequest} from './TournamentPatchRequest';
import {map} from 'rxjs/operators';
import {AuthToken, Persister} from './Persister';
import {Injectable} from '@angular/core';

@Injectable()
export class RestPersister implements Persister {
  private static readonly KEYS_TOURNAMENT_CREATE: string[] = ['name', 'description', 'sid'];
  private static readonly KEYS_TOURNAMENT_UPDATE: string[] = ['id', 'name', 'description', 'status'];
  private static readonly KEYS_PLAYER_UPDATE: string[] = ['id', 'name'];
  private static readonly KEYS_PROTOCOL_UPDATE: string[] = ['id', 'suit', 'owner', 'level', 'tricks'];

  constructor(private http: HttpClient) {
  }

  private static filterProperties<T>(data: T, keys: string[]): T {
    return <T> keys.reduce((result, key) => {
      if (key in data)
        result[key] = data[key];
      return result;
    }, {});
  }

  private static constructHeaders(token?: AuthToken): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    if (arguments.length > 0 && token)
      return headers.append('X-Tournament-Token', token);
    return headers;
  }

  getTournament(id: number): Observable<ExpandedTournamentDTO> {
    if (!Number.isInteger(id) || id <= 0)
      return throwError('illegal tournament id');
    return this.http.get<ExpandedTournamentDTO>(`/api/tournaments/${id}`);
  }

  getTournamentList(): Observable<TournamentDTO[]> {
    return this.http.get<TournamentDTO[]>(`/api/tournaments`);
  }

  getScheduleList(): Observable<ScheduleDTO[]> {
    return this.http.get<ScheduleDTO[]>(`/api/schedules`);
  }

  createTournament(data: TournamentDTO, token?: AuthToken): Observable<ExpandedTournamentDTO> {
    return this.http.post<ExpandedTournamentDTO>(`/api/tournaments`,
      RestPersister.filterProperties(data, RestPersister.KEYS_TOURNAMENT_CREATE),
      {headers: RestPersister.constructHeaders(token)}
    );
  }

  updateTournament(data: TournamentDTO, token?: AuthToken): Observable<Date> {
    return this.putResource('/api/tournaments', data, RestPersister.KEYS_TOURNAMENT_UPDATE, token);
  }

  updatePlayer(data: PlayerDTO, token?: AuthToken): Observable<Date> {
    return this.putResource('/api/players', data, RestPersister.KEYS_PLAYER_UPDATE, token);
  }

  updateProtocol(data: ProtocolDTO, token?: AuthToken): Observable<Date> {
    return this.putResource('/api/protocols', data, RestPersister.KEYS_PROTOCOL_UPDATE, token);
  }

  batchUpdateTournament(data: TournamentPatchRequest, token?: AuthToken): Observable<ExpandedTournamentDTO> {
    const filteredData: TournamentPatchRequest = {
      tid: data.tid,
      update: {}
    };
    if (data.update) {
      if (data.update.tournament)
        filteredData.update.tournament = RestPersister.filterProperties(data.update.tournament, RestPersister.KEYS_TOURNAMENT_UPDATE);
      if (data.update.players)
        filteredData.update.players = data.update.players.map(
          player => RestPersister.filterProperties(player, RestPersister.KEYS_PLAYER_UPDATE)
        );
      if (data.update.protocols)
        filteredData.update.protocols = data.update.protocols.map(
          protocol => RestPersister.filterProperties(protocol, RestPersister.KEYS_PROTOCOL_UPDATE)
        );
    }
    return this.http.patch<ExpandedTournamentDTO>(
      `/api/tournaments/${data.tid}`,
      filteredData,
      {headers: RestPersister.constructHeaders(token)}
    );
  }

  deleteTournament(id: number, token?: AuthToken): Observable<void> {
    if (!Number.isInteger(id) || id <= 0)
      return throwError('illegal tournament id');
    return this.http.delete(
      `/api/tournaments/${id}`,
      {headers: RestPersister.constructHeaders(token)}
    ).pipe(
      map(() => void(0))
    );
  }

  private putResource(baseUri: string, data: any, keys: string[], token?: AuthToken): Observable<Date> {
    let headers = RestPersister.constructHeaders(token);
    if (data['lastModified'])
      headers = headers.append('If-Unmodified-Since', new Date(data['lastModified']).toUTCString());
    data = RestPersister.filterProperties(data, keys);
    return this.http.put<HttpResponse<void>>(`${baseUri}/${data.id}`,
      data,
      {
        headers: headers,
        observe: 'response'
      }
    ).pipe(
      map(response => new Date(response.headers.get('Last-Modified')))
    );
  }
}
