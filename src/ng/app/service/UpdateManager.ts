import {Inject, Injectable} from '@angular/core';
import {ConnectableObservable, Observable, Subject} from 'rxjs';
import {UpdateEvent} from './UpdateEvent';
import {mergeMap, publish} from 'rxjs/operators';
import {Persister} from './api/Persister';

@Injectable()
export class UpdateManager {
  private readonly subject: Subject<UpdateEvent>;

  constructor(@Inject('Persister') private persister: Persister) {
    this.subject = new Subject<UpdateEvent>();
    (<ConnectableObservable<any>> this.subject.pipe(
      mergeMap(event => this.processUpdate(event)),
      publish()
    )).connect();
  }

  registerUpdate(event: UpdateEvent) {
    setTimeout(() => this.subject.next(event), 0);
  }

  private processUpdate(event: UpdateEvent): Observable<any> {
    switch (event.type) {
      case 'tournament':
        return this.persister.updateTournament(event.subject);
      case 'player':
        return this.persister.updatePlayer(event.subject);
      case 'protocol':
        return this.persister.updateProtocol(event.subject);
      default:
        console.warn(`unknown update type: "${event.type}"`);
    }
  }
}
