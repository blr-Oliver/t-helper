import {PairPosition} from './PairPosition';
import {Suit} from './Suit';

export class Contract {
  suit: Suit;
  owner: PairPosition;
  private _level: number;

  get level(): number {
    return this._level;
  }
  set level(value: number) {
    if (value < 0) {
      value = -1;
      this.suit = null;
      this.owner = null;
    }
    this._level = value;
  }

  get defined(): boolean {
    return this._level < 0 || !!(this._level > 0 && this.suit && this.owner);
  }
}
