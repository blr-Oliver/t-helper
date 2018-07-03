import {Tricks} from './Tricks';
import {Contract} from './Contract';
import {PairPosition} from './PairPosition';
import {ProgressiveGameScoring} from './GameScoring';

export class GamePoints {
  private readonly contract: Contract;
  private readonly tricks: Tricks;
  // TODO make hardcoded scoring strategy flexible

  constructor(contract: Contract, tricks: Tricks) {
    this.contract = contract;
    this.tricks = tricks;
  }
  get [PairPosition.NS](): number {
    return ProgressiveGameScoring.instance.compute(this.contract, this.tricks, PairPosition.NS);
  }
  get [PairPosition.EW](): number {
    return ProgressiveGameScoring.instance.compute(this.contract, this.tricks, PairPosition.EW);
  }
}
