import {Duel} from './Duel';
import {Pair} from './Pair';
import {Protocol} from './Protocol';
import {crossPosition} from './PairPosition';
import {Game} from './Game';

export interface TournamentScoring {
  duelScore(duel: Duel, pair: Pair): number;

  gameScore(game: Game, pair: Pair): number;
}

export class MaxTournamentScoring implements TournamentScoring {
  static instance: TournamentScoring = new MaxTournamentScoring();

  duelScore(duel: Duel, pair: Pair): number {
    if (duel.defined) {
      const index = duel.getPairIndex(pair);
      const opIndex = 1 - index;
      const cross = crossPosition(duel.position);
      const ownDiff = duel.games[index].protocol.points[duel.position] - duel.games[index].protocol.points[cross];
      const opDiff = duel.games[opIndex].protocol.points[duel.position] - duel.games[opIndex].protocol.points[cross];
      return 1 + Math.sign(ownDiff - opDiff);
    }
    return 1;
  }

  gameScore(game: Game, pair: Pair): number {
    const protocol: Protocol = game.protocol;
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
