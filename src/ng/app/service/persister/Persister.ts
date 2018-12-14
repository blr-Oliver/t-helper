import {Observable} from 'rxjs';
import {ExpandedTournamentDTO, TournamentDTO} from '../../model/dto/TournamentDTO';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';
import {PlayerDTO} from '../../model/dto/PlayerDTO';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';

export type AuthToken = string;

export interface Persister {
  getTournament(id: number): Observable<ExpandedTournamentDTO>;
  getTournamentList(): Observable<TournamentDTO[]>;
  getScheduleList(): Observable<ScheduleDTO[]>;

  createTournament(data: TournamentDTO, token?: AuthToken): Observable<ExpandedTournamentDTO>;
  updateTournament(data: TournamentDTO, token?: AuthToken): Observable<void | TournamentDTO>;
  updatePlayer(data: PlayerDTO, token?: AuthToken): Observable<void | PlayerDTO>;
  updateProtocol(data: ProtocolDTO, token?: AuthToken): Observable<void | ProtocolDTO>;
  // batchUpdateTournament(data: TournamentPatchRequest, token?: AuthToken): Observable<ExpandedTournamentDTO>;
  deleteTournament(id: number, token?: AuthToken): Observable<void>;
}
