import {crossPosition} from './PairPosition';
import {Duel} from './Duel';
import {PairEntity} from './entity/PairEntity';
import {GameEntity} from './entity/GameEntity';
import {ProtocolEntity} from './entity/ProtocolEntity';

export interface TournamentScoring {
  duelScore(duel: Duel, pair: PairEntity): number;
  gameScore(game: GameEntity, pair: PairEntity): number;
}

export class MaxTournamentScoring implements TournamentScoring {
  static instance: TournamentScoring = new MaxTournamentScoring();

  duelScore(duel: Duel, pair: PairEntity): number {
    if (duel.defined) {
      const index = duel.getPairIndex(pair);
      const opIndex = 1 - index;
      const cross = crossPosition(duel.position);
      const ownDiff = duel.games[index].points[duel.position] - duel.games[index].points[cross];
      const opDiff = duel.games[opIndex].points[duel.position] - duel.games[opIndex].points[cross];
      return 1 + Math.sign(ownDiff - opDiff);
    }
    return 1;
  }

  gameScore(game: GameEntity, pair: PairEntity): number {
    const protocol: ProtocolEntity = game.protocol;
    if (protocol.defined) {
      const position = game.getPosition(pair);
      if (protocol.contract.owner === position && protocol.contract.level >= 6 &&
        protocol.tricks[position] >= protocol.contract.level + 6) {
        return protocol.contract.level - 5;
      }
      return 0;
    }
  }
}
