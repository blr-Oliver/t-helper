import {Inject, Injectable} from '@angular/core';
import {ConnectableObservable, Subject} from 'rxjs';
import {UpdateEvent} from './UpdateEvent';
import {filter, mergeMap, publish} from 'rxjs/operators';
import {HttpTournamentLoader, TournamentLoader} from './rest/tournament-loader.service';

@Injectable()
export class UpdateManager {
  private readonly subject: Subject<UpdateEvent>;

  constructor(@Inject('TournamentLoader') private loader: HttpTournamentLoader) {
    this.subject = new Subject<UpdateEvent>();
    (<ConnectableObservable<any>>this.subject.pipe(
      filter(event => event.type === 'protocol'),
      mergeMap(event => this.loader.saveProtocol(event.context.tour, event.context.table, event.subject)),
      publish()
    )).connect();
  }

  registerUpdate(event: UpdateEvent) {
    setTimeout(() => this.subject.next(event), 0);
  }
}
