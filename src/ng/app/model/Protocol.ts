import {ProtocolDTO} from './dto/ProtocolDTO';
import {Suit} from './Suit';
import {PairPosition} from './PairPosition';

export class Protocol {
  readonly data: ProtocolDTO;
  readonly contract: Contract;
  readonly tricks: Tricks;

  constructor(data: ProtocolDTO) {
    this.data = data;
    this.contract = new Contract(data);
    this.tricks = new Tricks(data);
  }

  get defined() {
    return this.contract.defined && this.tricks.defined;
  }
}

export class Contract {
  private readonly data: ProtocolDTO;

  constructor(data: ProtocolDTO) {
    this.data = data;
  }

  get suit(): Suit { return this.data.suit; }
  set suit(value: Suit) { this.data.suit = value; }

  get owner(): PairPosition { return this.data.owner; }
  set owner(value: PairPosition) { this.data.owner = value; }

  get level(): number { return this.data.level; }
  set level(value: number) {
    if (value < 0) {
      value = -1;
      this.suit = null;
      this.owner = null;
    } else if (value > 7) {
      value = 7;
    }
    this.data.level = value;
  }

  get defined(): boolean {
    return this.level < 0 || !!(this.level > 0 && this.suit && this.owner);
  }
}

export class Tricks {
  private readonly data: ProtocolDTO;

  constructor(data: ProtocolDTO) {
    this.data = data;
  }

  get [PairPosition.NS](): number {
    return this.data.tricks;
  }
  set [PairPosition.NS](value: number) {
    this.data.tricks = Math.max(0, Math.min(value, 13));
  }

  get [PairPosition.EW](): number {
    return 13 - this.data.tricks;
  }
  set [PairPosition.EW](value: number) {
    this.data.tricks = 13 - Math.max(0, Math.min(value, 13));
  }

  get defined(): boolean {
    return this.data.tricks >= 0;
  }
}

