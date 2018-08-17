import {Position} from './Position';

export interface Seating<T> {
  [Position.N]: T;
  [Position.E]: T;
  [Position.S]: T;
  [Position.W]: T;
}

export interface UnmodifiableSeating<T> extends Seating<T> {
  readonly [Position.N]: T;
  readonly [Position.E]: T;
  readonly [Position.S]: T;
  readonly [Position.W]: T;
}
