import {AuthToken, Persister} from './Persister';
import {TournamentPatchRequest} from './TournamentPatchRequest';
import {Observable} from 'rxjs/internal/Observable';
import {ExpandedTournamentDTO, TournamentDTO} from '../../model/dto/TournamentDTO';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';
import {PlayerDTO} from '../../model/dto/PlayerDTO';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';
import {IndexedDBProvider} from '../IndexedDBProvider';
import {GameSlotDTO} from '../../model/dto/GameSlotDTO';
import {fromPromise} from 'rxjs/internal-compatibility';
import {DTO} from '../../model/dto/DTO';
import {IndexedDBUtils} from './IndexedDBUtils';
import {Injectable} from '@angular/core';

// TODO implement AuthToken
@Injectable()
export class IndexedDBPersister implements Persister {
  constructor(private db: IndexedDBProvider) {
  }

  getTournament(id: number): Observable<ExpandedTournamentDTO> {
    return fromPromise(
      this.db.get()
        .then(db => db.transaction(['tournament', 'schedule', 'gameSlot', 'player', 'protocol'], 'readonly'))
        .then(tx => IndexedDBUtils.getOne<ExpandedTournamentDTO>(tx.objectStore('tournament'), id)
          .then(tournament =>
            Promise.all([
              IndexedDBUtils.getOne<ScheduleDTO>(tx.objectStore('schedule'), tournament.sid)
                .then(schedule => IndexedDBUtils.findAll<GameSlotDTO>(tx.objectStore('gameSlot'), 'schedule', schedule.id)
                  .then(games => (schedule.games = games, schedule))),
              IndexedDBUtils.findAll<PlayerDTO>(tx.objectStore('player'), 'tournament', tournament.id),
              IndexedDBUtils.findAll<ProtocolDTO>(tx.objectStore('protocol'), 'tournament', tournament.id),
            ]).then(results => {
              const [schedule, players, protocols] = results;
              tournament.schedule = schedule;
              tournament.players = players;
              tournament.protocols = protocols;
              return tournament;
            })
          ))
    );
  }

  getTournamentList(): Observable<TournamentDTO[]> {
    return fromPromise(this.db.get()
      .then(db => db.transaction(['tournament'], 'readonly'))
      .then(tx => IndexedDBUtils.getAll<TournamentDTO>(tx.objectStore('tournament')))
    );
  }

  getScheduleList(): Observable<ScheduleDTO[]> {
    return fromPromise(this.db.get()
      .then(db => db.transaction(['schedule'], 'readonly'))
      .then(tx => IndexedDBUtils.getAll<ScheduleDTO>(tx.objectStore('schedule')))
    );
  }

  batchUpdateTournament(data: TournamentPatchRequest, token?: AuthToken): Observable<ExpandedTournamentDTO> {
    // TODO
    return undefined;
  }

  createTournament(data: TournamentDTO, token?: AuthToken): Observable<ExpandedTournamentDTO> {
    return fromPromise(this.db.get()
      .then(db => db.transaction(['tournament', 'schedule', 'gameSlot', 'player', 'protocol'], 'readwrite'))
      .then(tx => {
        return Promise.all([
          IndexedDBUtils.create<ExpandedTournamentDTO>(tx.objectStore('tournament'), <ExpandedTournamentDTO> data)
            .then(list => list[0]),
          IndexedDBUtils.getOne<ScheduleDTO>(tx.objectStore('schedule'), data.sid),
          IndexedDBUtils.findAll<GameSlotDTO>(tx.objectStore('gameSlot'), 'schedule', data.sid)
        ]).then(results => {
          const [tournament, schedule, games] = results;
          tournament.schedule = schedule;
          schedule.games = games;

          const protocols: ProtocolDTO[] = games.map(slot => ({
            tid: tournament.id,
            gid: slot.id
          }));

          const players: PlayerDTO[] = schedule.players.map(slot => ({
            tid: tournament.id,
            slot: slot
          }));

          return Promise.all([
            IndexedDBUtils.create(tx.objectStore('protocol'), ...protocols),
            IndexedDBUtils.create(tx.objectStore('player'), ...players),
          ]).then(res => {
            tournament.protocols = res[0];
            tournament.players = res[1];
            return tournament;
          });
        });
      })
    );
  }

  updateTournament(data: TournamentDTO, token?: AuthToken): Observable<TournamentDTO> {
    return this.updateDTO(data, 'tournament', token);
  }

  updatePlayer(data: PlayerDTO, token?: AuthToken): Observable<PlayerDTO> {
    return this.updateDTO(data, 'player', token);
  }

  updateProtocol(data: ProtocolDTO, token?: AuthToken): Observable<ProtocolDTO> {
    return this.updateDTO(data, 'protocol', token);
  }

  deleteTournament(id: number, token?: AuthToken): Observable<void> {
    return fromPromise(this.db.get()
      .then(db => db.transaction(['tournament', 'player', 'protocol'], 'readwrite'))
      .then(tx => Promise.all(
        [
          IndexedDBUtils.deleteOne(tx.objectStore('tournament'), id),
          IndexedDBUtils.deleteAllWithIndex(tx.objectStore('player'), 'tournament', id),
          IndexedDBUtils.deleteAllWithIndex(tx.objectStore('protocol'), 'tournament', id),
        ])
        .then(results => void(0))
      )
    );
  }

  private updateDTO<T extends DTO>(data: T, store: string, token?: AuthToken) {
    return fromPromise(this.db.get()
      .then(db => db.transaction([store], 'readwrite'))
      .then(tx => IndexedDBUtils.updateOne(tx.objectStore(store), data))
    );
  }
}
