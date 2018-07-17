import {Position} from './Position';
import {Player} from './Player';
import {Protocol} from './Protocol';
import {PairPosition} from './PairPosition';
import {Pair, PairRepository} from './Pair';

export interface GameSchedule {
  tour: number;
  table: number;
  deal: number;
  dealer?: string;
  players: {
    [Position.N]: string;
    [Position.E]: string;
    [Position.S]: string;
    [Position.W]: string;
  };
}

export class Game {
  readonly tour: number;
  readonly table: number;
  readonly deal: number;
  readonly dealer: Position;
  readonly players: {
    readonly [Position.N]: Player;
    readonly [Position.E]: Player;
    readonly [Position.S]: Player;
    readonly [Position.W]: Player;
  };
  readonly pairs: {
    readonly [PairPosition.NS]: Pair;
    readonly [PairPosition.EW]: Pair;
  };
  readonly protocol: Protocol;

  constructor (game: GameSchedule, players: {[id: string]: Player}, pairs: PairRepository) {
    this.tour = game.tour;
    this.table = game.table;
    this.deal = game.deal;
    this.dealer = <Position> game.dealer;
    this.players = {
      [Position.N]: players[game.players[Position.N]],
      [Position.E]: players[game.players[Position.E]],
      [Position.S]: players[game.players[Position.S]],
      [Position.W]: players[game.players[Position.W]]
    };
    this.pairs = {
      [PairPosition.NS]: pairs.find(this.players[Position.N]),
      [PairPosition.EW]: pairs.find(this.players[Position.E])
    };
    this.protocol = new Protocol(this);
  }

  getPosition(pair: Pair): PairPosition {
    if (this.pairs[PairPosition.NS] === pair) { return PairPosition.NS; }
    if (this.pairs[PairPosition.EW] === pair) { return PairPosition.EW; }
    return null;
  }
}
