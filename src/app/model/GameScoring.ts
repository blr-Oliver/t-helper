import {Tricks} from './Tricks';
import {Contract} from './Contract';
import {PairPosition} from './PairPosition';

export interface GameScoring {
  readonly name: string;
  compute(contract: Contract, tricks: Tricks, owner: PairPosition): number;
}

export class ProgressiveGameScoring implements GameScoring {
  static instance: GameScoring = new ProgressiveGameScoring();
  name: 'Progressive scoring';

  compute(contract: Contract, tricks: Tricks, owner: PairPosition): number {
    if (contract.defined && tricks.defined) {
      const l: number = contract.level,
      t: number = tricks[owner],
      isOwner: boolean = contract.owner === owner;
      return l === -1 ? Math.max(t - 6, 0) * -1 : l * (t + (isOwner ? 0 : Math.max(0, l + t - 7) * l));
    }
  }
}
