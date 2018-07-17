import {PairPosition} from './PairPosition';
import {Game} from './Game';
import {Pair} from './Pair';
import {MaxTournamentScoring} from './TournamentScoring';

export class Duel {
  readonly deal: number;
  readonly position: PairPosition;
  readonly games: [Game, Game];
  readonly pairs: [Pair, Pair];
  readonly scores: DuelScores;

  constructor(game1: Game, game2: Game, position: PairPosition) {
    if (game1.deal !== game2.deal) {
      throw new Error('Illegal duel initialization');
    }
    this.deal = game1.deal;
    this.position = position;
    this.games = <[Game, Game]> [game1, game2]
      .sort((a, b) => a.pairs[position].players[0].id.localeCompare(b.pairs[position].players[0].id));
    this.pairs = <[Pair, Pair]> this.games.map(p => p.pairs[position]);
    this.scores = new DuelScores();
  }

  getPairIndex(pair: Pair): number {
    if (this.pairs[0] === pair) { return 0; }
    if (this.pairs[1] === pair) { return 1; }
    return null;
  }

  get defined(): boolean {
    return this.games[0].protocol.defined && this.games[1].protocol.defined;
  }
}

class DuelScores {
  private _duel: Duel;

  get [0] (): number {
    return MaxTournamentScoring.instance.duelScore(this._duel, this._duel.pairs[0]);
  }
  get [1] (): number {
    return MaxTournamentScoring.instance.duelScore(this._duel, this._duel.pairs[1]);
  }
}
