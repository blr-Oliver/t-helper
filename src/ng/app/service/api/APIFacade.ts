import {Observable} from 'rxjs';
import {ExpandedTournamentDTO, TournamentDTO} from '../../model/dto/TournamentDTO';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';
import {TournamentPatchRequest} from '../rest/TournamentPatchRequest';
import {PlayerDTO} from '../../model/dto/PlayerDTO';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';

export type AuthToken = any;
export interface APIFacade {
  getTournament(id: number): Observable<ExpandedTournamentDTO>;
  getTournamentList(): Observable<TournamentDTO[]>;
  getScheduleList(): Observable<ScheduleDTO[]>;

  createTournament(data: TournamentDTO, token?: AuthToken): Observable<ExpandedTournamentDTO>;
  updateTournament(data: TournamentDTO, token?: AuthToken): Observable<void>;
  updatePlayer(data: PlayerDTO, token?: AuthToken): Observable<void>;
  updateProtocol(data: ProtocolDTO, token?: AuthToken): Observable<void>;
  batchUpdateTournament(data: TournamentPatchRequest, token?: AuthToken): Observable<ExpandedTournamentDTO>;
  deleteTournament(id: number, token?: AuthToken): Observable<void>;
}

export class RestAPIFacade implements APIFacade {
  getTournament(id: number): Observable<ExpandedTournamentDTO> {
    return undefined;
  }

  getTournamentList(): Observable<TournamentDTO[]> {
    return undefined;
  }

  getScheduleList(): Observable<ScheduleDTO[]> {
    return undefined;
  }

  createTournament(data: TournamentDTO, token?: AuthToken): Observable<ExpandedTournamentDTO> {
    return undefined;
  }

  updateTournament(data: TournamentDTO, token?: AuthToken): Observable<void> {
    return undefined;
  }

  updatePlayer(data: PlayerDTO, token?: AuthToken): Observable<void> {
    return undefined;
  }

  updateProtocol(data: ProtocolDTO, token?: AuthToken): Observable<void> {
    return undefined;
  }

  batchUpdateTournament(data: TournamentPatchRequest, token?: AuthToken): Observable<ExpandedTournamentDTO> {
    return undefined;
  }

  deleteTournament(id: number, token?: AuthToken): Observable<void> {
    return undefined;
  }
}
