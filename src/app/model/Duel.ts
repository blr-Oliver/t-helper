import {Protocol} from './Protocol';
import {PairPosition} from './PairPosition';
import {Game} from './Game';
import {Pair} from './Pair';
import {MaxTournamentScoring} from './TournamentScoring';

export class Duel {
  readonly deal: number;
  readonly position: PairPosition;
  readonly protocols: {
    readonly [id: string]: Protocol
  };
  readonly pairs: {
    readonly [id: string]: Pair
  };
  readonly opponents: {
    readonly [id: string]: Pair;
  };
  readonly scores: {
    readonly [id: string]: number
  };

  constructor(game1: Game, game2: Game, position: PairPosition) {
    if (game1.deal !== game2.deal) {
      throw new Error('Illegal duel initialization');
    }
    const pairIds = [game1.pairs[position].id, game2.pairs[position].id];
    this.deal = game1.deal;
    this.position = position;
    this.protocols = {
      [pairIds[0]]: game1.protocol,
      [pairIds[1]]: game2.protocol
    };
    this.pairs = {
      [pairIds[0]]: game1.pairs[position],
      [pairIds[1]]: game2.pairs[position]
    };
    this.opponents = {
      [pairIds[1]]: game1.pairs[position],
      [pairIds[0]]: game2.pairs[position]
    };
    this.scores = {
      get [pairIds[0]](): number {
        // TODO doesn't "this" here refer to the scores field?
        return MaxTournamentScoring.instance.duelScore(this, this.pairs[pairIds[0]]);
      },
      get [pairIds[1]](): number {
        return MaxTournamentScoring.instance.duelScore(this, this.pairs[pairIds[1]]);
      }
    };
  }

  get defined(): boolean {
    return Object.keys(this.protocols).every(id => this.protocols[id].defined);
  }
}
