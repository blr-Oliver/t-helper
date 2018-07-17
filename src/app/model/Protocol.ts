import {Game} from './Game';
import {PairPosition} from './PairPosition';
import {ProgressiveGameScoring} from './GameScoring';
import {Suit} from './Suit';

export class Protocol {
  readonly game: Game;
  readonly contract: Contract;
  readonly tricks: Tricks;
  readonly points: GamePoints;

  constructor(game: Game) {
    this.game = game;
    this.contract = new Contract();
    this.tricks = new Tricks();
    this.points = new GamePoints(this);
  }

  get defined(): boolean {
    return this.contract.defined && this.tricks.defined;
  }
}

class Contract {
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
    } else if (value > 7) { value = 7; }
    this._level = value;
  }

  get defined(): boolean {
    return this._level < 0 || !!(this._level > 0 && this.suit && this.owner);
  }
}

class Tricks {
  private _value: number;

  get defined(): boolean {
    return this._value !== undefined;
  }
  get [PairPosition.NS](): number {
    return this._value;
  }
  set [PairPosition.NS](value: number) {
    this._value = Math.max(0, Math.min(value, 13));
  }
  get [PairPosition.EW](): number {
    if (this.defined) {
      return 13 - this._value;
    }
  }
  set [PairPosition.EW](value: number) {
    this._value = 13 - Math.max(0, Math.min(value, 13));
  }
}

class GamePoints {
  private readonly _enclosed: Protocol;
  // TODO make hardcoded scoring strategy flexible

  constructor(enclosed: Protocol) {
    this._enclosed = enclosed;
  }
  get [PairPosition.NS](): number {
    return ProgressiveGameScoring.instance.compute(this._enclosed, PairPosition.NS);
  }
  get [PairPosition.EW](): number {
    return ProgressiveGameScoring.instance.compute(this._enclosed, PairPosition.EW);
  }
}

