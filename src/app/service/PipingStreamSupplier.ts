import {multicast} from 'rxjs/operators';
import {Observable, OperatorFunction, Subject, Subscriber} from 'rxjs';
import {StreamSupplier} from './StreamSupplier';

export class PipingStreamSupplier<T, R> implements StreamSupplier<T, R> {

  private lastRequest: T;
  private requestFeed: Subscriber<T>;
  private readonly sourceStream: Observable<T>;
  private readonly resultStream: Observable<R>;

  protected constructor(...operators: OperatorFunction<any, any>[]) {
    const sourceOrigin = Observable.create(subscriber => {
      if (this.requestFeed)
        throw new Error('Only single subscriber allowed for source origin');
      this.requestFeed = subscriber;
    });
    const sourceStream = sourceOrigin.pipe(
      multicast(new Subject())
    );
    const resultStream = sourceStream.pipe(...operators, multicast(new Subject()));
    sourceStream.connect();
    resultStream.connect();
    this.sourceStream = sourceStream;
    this.resultStream = resultStream;
  }

  static create<T, R>(op1: OperatorFunction<T, R>): PipingStreamSupplier<T, R>;

  static create<T, A, R>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, R>): PipingStreamSupplier<T, R>;

  static create<T, A, B, R>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, R>): PipingStreamSupplier<T, R>;

  static create<T, R>(...operators: OperatorFunction<any, any>[]): PipingStreamSupplier<T, R>;

  static create<T, R>(...operators: OperatorFunction<T, R>[]): PipingStreamSupplier<T, R> {
    return new PipingStreamSupplier(...operators);
  }

  getSourceStream(request?: T): Observable<T> {
    if (arguments.length > 0)
      this.feedIfNecessary(request);
    return this.sourceStream;
  }

  getResultStream(request?: T): Observable<R> {
    if (arguments.length > 0)
      this.feedIfNecessary(request);
    return this.resultStream;
  }

  private feedIfNecessary(request: T) {
    if (this.lastRequest !== request) {
      this.lastRequest = request;
      setTimeout(() => this.requestFeed.next(request), 0);
    }
  }
}
