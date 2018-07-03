import {PairPosition} from './PairPosition';

export class Tricks {
  private _tricks: number;

  get defined(): boolean {
    return this._tricks !== undefined;
  }
  get [PairPosition.NS](): number {
    return this._tricks;
  }
  set [PairPosition.NS](value: number) {
    this._tricks = Math.max(0, Math.min(value, 13));
  }
  get [PairPosition.EW](): number {
    if (this.defined) {
      return 13 - this._tricks;
    }
  }
  set [PairPosition.EW](value: number) {
    this._tricks = 13 - Math.max(0, Math.min(value, 13));
  }
}
