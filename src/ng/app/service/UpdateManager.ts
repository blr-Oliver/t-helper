import {Injectable} from '@angular/core';
import {ConnectableObservable, Observable, Subject} from 'rxjs';
import {UpdateEvent} from './UpdateEvent';
import {RestAPIFacade} from './api/RestAPIFacade';
import {mergeMap, publish} from 'rxjs/operators';

@Injectable()
export class UpdateManager {
  private readonly subject: Subject<UpdateEvent>;

  constructor(private apiFacade: RestAPIFacade) {
    this.subject = new Subject<UpdateEvent>();
    (<ConnectableObservable<any>> this.subject.pipe(
      mergeMap(event => this.processUpdate(event)),
      publish()
    )).connect();
  }

  private processUpdate(event: UpdateEvent): Observable<void> {
    switch (event.type) {
      case 'tournament':  return this.apiFacade.updateTournament(event.subject);
      case 'player':      return this.apiFacade.updatePlayer(event.subject);
      case 'protocol':    return this.apiFacade.updateProtocol(event.subject);
      default:            console.warn(`unknown update type: "${event.type}"`);
    }
  }

  registerUpdate(event: UpdateEvent) {
    setTimeout(() => this.subject.next(event), 0);
  }
}
