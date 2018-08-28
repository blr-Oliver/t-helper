import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, skipWhile} from 'rxjs/operators';
import {UpdateEvent} from './UpdateEvent';

export interface DebounceBarrierSettings<C, E> {
  delay: number;
  handler: (event: E) => any;
  denominator: (event: E) => string;
  categories: string[];
  selector: (event: E) => any;
  extractor: (context: C, category: string) => any;
}

export class DebounceBarrier<C/*context*/, E/*event*/> {
  private readonly settings: DebounceBarrierSettings<C, E>;
  private barriers: { [category: string]: Subject<E> };

  constructor(settings: DebounceBarrierSettings<C, E>) {
    this.settings = settings;
  }

  init(context: C) {
    this.barriers = this.settings.categories.reduce((hash, category) => {
      const initial = this.settings.extractor(context, category);
      const subject = hash[category] = new Subject<E>();
      subject.pipe(
        debounceTime(this.settings.delay),
        distinctUntilChanged(null, this.settings.selector),
        skipWhile(e => this.settings.selector(e) !== initial)
      ).subscribe(this.settings.handler);
      return hash;
    }, {});
  }

  next(event: E) {
    this.barriers[this.settings.denominator(event)].next(event);
  }
}

export class UpdateEventDebounceBarrier<E> extends DebounceBarrier<E, UpdateEvent> {
  constructor(delay: number, properties: string[], handler: (event: UpdateEvent) => void) {
    super({
      delay: delay,
      handler: handler,
      denominator: event => event.property,
      categories: properties,
      selector: event => event.currentValue,
      extractor: (context: E, category: string) => context[category]
    });
  }
}
