import {PairPosition} from './PairPosition';

export interface PairSeating<T> {
  readonly [PairPosition.NS]: T;
  readonly [PairPosition.EW]: T;
}
