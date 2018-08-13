import {PairPosition} from './PairPosition';
import {MaxTournamentScoring} from './TournamentScoring';
import {GameEntity} from './GameEntity';
import {PairEntity} from './PairEntity';

export class Duel {
  readonly deal: number;
  readonly position: PairPosition;
  readonly games: [GameEntity, GameEntity];
  readonly pairs: [PairEntity, PairEntity];
  readonly scores: DuelScores;

  constructor(game1: GameEntity, game2: GameEntity, position: PairPosition) {
    if (game1.deal !== game2.deal) {
      throw new Error('Illegal duel initialization');
    }
    this.deal = game1.deal;
    this.position = position;
    this.games = <[GameEntity, GameEntity]> [game1, game2]
      .sort((a, b) => a.pairs[position].name.localeCompare(b.pairs[position].name));
    this.pairs = <[PairEntity, PairEntity]> this.games.map(p => p.pairs[position]);
    this.scores = new DuelScores(this);
  }

  getPairIndex(pair: PairEntity): number {
    if (this.pairs[0] === pair) { return 0; }
    if (this.pairs[1] === pair) { return 1; }
    return null;
  }

  get defined(): boolean {
    return this.games[0].protocol.defined && this.games[1].protocol.defined;
  }
}

class DuelScores {
  private readonly _duel: Duel;

  constructor(duel: Duel) {
    this._duel = duel;
  }
  get [0] (): number {
    return MaxTournamentScoring.instance.duelScore(this._duel, this._duel.pairs[0]);
  }
  get [1] (): number {
    return MaxTournamentScoring.instance.duelScore(this._duel, this._duel.pairs[1]);
  }
}
