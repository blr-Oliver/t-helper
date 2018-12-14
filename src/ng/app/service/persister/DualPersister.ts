import {AuthToken, Persister} from './Persister';
import {ExpandedTournamentDTO, TournamentDTO} from '../../model/dto/TournamentDTO';
import {Observable} from 'rxjs';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';
import {PlayerDTO} from '../../model/dto/PlayerDTO';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';

export class DualPersister implements Persister {
  constructor(
    private remote: Persister,
    private local: Persister
  ) {
  }

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

  updateTournament(data: TournamentDTO, token?: AuthToken): Observable<void | TournamentDTO> {
    return undefined;
  }

  updatePlayer(data: PlayerDTO, token?: AuthToken): Observable<void | PlayerDTO> {
    return undefined;
  }

  updateProtocol(data: ProtocolDTO, token?: AuthToken): Observable<void | ProtocolDTO> {
    return undefined;
  }

  deleteTournament(id: number, token?: AuthToken): Observable<void> {
    return undefined;
  }

}
