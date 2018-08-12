import {Position} from './Position';

export interface Seating<T> {
  [Position.N]: T;
  [Position.E]: T;
  [Position.S]: T;
  [Position.W]: T;
}
