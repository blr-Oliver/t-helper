import {Duel} from './Duel';
import {Pair} from './Pair';
import {Protocol} from './Protocol';
import {crossPosition} from './PairPosition';

export interface TournamentScoring {
  duelScore(duel: Duel, pair: Pair): number;
  tourScore(protocol: Protocol, pair: Pair): number;
}

export class MaxTournamentScoring implements TournamentScoring {
  static instance: TournamentScoring = new MaxTournamentScoring();

  duelScore(duel: Duel, pair: Pair): number {
    if (duel.defined) {
      const opponent = duel.opponents[pair.id];
      const cross = crossPosition(duel.position);
      const ownDiff = duel.protocols[pair.id].points[duel.position] - duel.protocols[pair.id].points[cross];
      const opponentDiff = duel.protocols[opponent.id].points[duel.position] - duel.protocols[opponent.id].points[cross];
      return 1 + Math.sign(ownDiff - opponentDiff);
    }
    return 1;
  }

  tourScore(protocol: Protocol, pair: Pair) {
    if (protocol.defined) {
      const position = protocol.game.positions[pair.id];
      if (protocol.contract.owner === position && protocol.contract.level >= 6 &&
          protocol.tricks[position] >= protocol.contract.level + 6) {
        return protocol.contract.level - 5;
      }
      return 0;
    }
  }
}
