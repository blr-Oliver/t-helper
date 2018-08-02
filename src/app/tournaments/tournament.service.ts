import {Injectable} from '@angular/core';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {Observable, of} from 'rxjs';
import * as schedule_4 from '../../data/Schedule-4.json';
import {GameSlotDTO} from '../model/dto/GameSlotDTO';

const schedule: GameSlotDTO[] = (<any> schedule_4).map((game, i) => (game.id = i + 1, game));

// TODO replace hardcoded value with remote fetching
const sample: TournamentDTO[] = [
  {
    id: 1,
    sid: 1,
    name: 'Sample tournament',
    description: 'This is sample one',
    dateCreated: new Date(),
    status: 'preparing',

    schedule: {
      id: 1,
      name: 'Sample schedule',
      totalPairs: 4,
      totalTables: 2,
      totalTours: 12,
      players: 'AaBbCcDd'.split(''),
      games: schedule
    },
    players: 'AaBbCcDd'.split('').map((slot, i) => ({
      id: i + 1,
      tid: 1,
      slot: slot,
      name: ''
    })),
    protocols: schedule.map((game, i) => ({
      id: i + 1,
      tid: 1,
      gid: game.id,
      owner: null,
      suit: null,
      level: undefined,
      tricks: undefined
    }))
  }
];

@Injectable()
export class TournamentService {
  getTournaments(): Observable<TournamentDTO[]> {
    return of(sample);
  }

  getTournament(id: string | number): Observable<TournamentDTO> {
    console.log(`requested tournament with [id=${id}]`);
    return of(sample[0]);
  }
}
