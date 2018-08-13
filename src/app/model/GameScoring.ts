import {PairPosition} from './PairPosition';
import {ProtocolEntity} from './ProtocolEntity';

export interface GameScoring {
  readonly name: string;
  compute(protocol: ProtocolEntity, owner: PairPosition): number;
}

export class ProgressiveGameScoring implements GameScoring {
  static instance: GameScoring = new ProgressiveGameScoring();
  name: 'Progressive scoring';

  compute(protocol: ProtocolEntity, owner: PairPosition): number {
    const contract = protocol.contract;
    const tricks = protocol.tricks;
    if (contract.defined && tricks.defined) {
      const l: number = contract.level,
      t: number = tricks[owner],
      isOwner: boolean = contract.owner === owner;
      return l === -1 ? Math.max(t - 6, 0) * -1 : l * (t + (isOwner ? 0 : Math.max(0, l + t - 7) * l));
    }
  }
}
