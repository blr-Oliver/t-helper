import {Injectable} from '@angular/core';
import {ConnectableObservable, Subject} from 'rxjs';
import {UpdateEvent} from './UpdateEvent';
import {filter, mergeMap, publish} from 'rxjs/operators';
import {RestAPIFacade} from './api/APIFacade';

@Injectable()
export class UpdateManager {
  private readonly subject: Subject<UpdateEvent>;

  constructor(private apiFacade: RestAPIFacade) {
    this.subject = new Subject<UpdateEvent>();
    (<ConnectableObservable<any>>this.subject.pipe(
      filter(event => event.type === 'protocol'),
      mergeMap(event => this.apiFacade.updateProtocol(event.subject)),
      publish()
    )).connect();
  }

  registerUpdate(event: UpdateEvent) {
    setTimeout(() => this.subject.next(event), 0);
  }
}
