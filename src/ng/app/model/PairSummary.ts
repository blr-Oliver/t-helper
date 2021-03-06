import {MaxTournamentScoring} from './TournamentScoring';
import {StandingsRecord} from './Standings';
import {Pair} from './Pair';
import {Duel} from './Duel';
import {Game} from './Game';

export class PairSummary implements StandingsRecord {
  readonly pair: Pair;
  readonly duels: Duel[];
  readonly games: Game[];

  constructor(pair: Pair, duels: Duel[]) {
    this.pair = pair;
    this.duels = duels.filter(d => !!d);
    this.games = this.duels.map(duel => duel.games[duel.getPairIndex(pair)]);
  }

  get duelScore(): number {
    const pair = this.pair;
    return this.duels.reduce(function (total, duel) {
      return total + (duel.scores[duel.getPairIndex(pair)] || 0);
    }, 0);
  }

  get bonusScore(): number {
    const pair = this.pair;
    return this.games.reduce(function (total, game) {
      return total + (MaxTournamentScoring.instance.gameScore(game, pair) || 0);
    }, 0);
  }

  get rank(): number {
    throw new Error('Unsupported operation');
  }
}
