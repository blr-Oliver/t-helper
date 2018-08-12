import {Observable} from 'rxjs';

export interface StreamSupplier<T, R> {
  getSourceStream(request?: T): Observable<T>;

  getResultStream(request?: T): Observable<R>;
}
