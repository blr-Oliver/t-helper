import {Injectable} from '@angular/core';
import {ConnectableObservable, Observable, Subject} from 'rxjs';
import {UpdateEvent} from './UpdateEvent';
import {multicast, tap} from 'rxjs/operators';

@Injectable()
export class UpdateManager {
  private readonly subject: Subject<UpdateEvent>;
  private readonly stream: ConnectableObservable<UpdateEvent>;

  constructor() {
    this.subject = new Subject<UpdateEvent>();
    this.stream = <ConnectableObservable<UpdateEvent>> this.subject.pipe(
      tap(update => console.log(update)),
      multicast(new Subject<UpdateEvent>()),
    );
    this.stream.connect();
  }

  registerUpdate(event: UpdateEvent) {
    this.subject.next(event);
  }

  getStream(): Observable<UpdateEvent> {
    return this.stream;
  }
}
