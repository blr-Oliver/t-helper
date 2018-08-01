import {Injectable} from '@angular/core';
import {TournamentDTO} from '../model/dto/TournamentDTO';
import {Observable, of} from 'rxjs';

// TODO replace hardcoded value with remote fetching
const sample: TournamentDTO[] = [
  {
    id: 1,
    sid: 1,
    name: 'Sample tournament',
    description: 'This is dummy one',
    dateCreated: new Date(),
    status: 'preparing'
  }
];

@Injectable()
export class TournamentService {
  getTournaments(): Observable<TournamentDTO[]> {
    return of(sample);
  }

  getTournament(id: string | number): Observable<TournamentDTO> {
    return of(sample[0]);
  }
}
