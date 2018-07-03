import {Position} from './Position';
import {Player, PlayerFactory} from './Player';
import {Protocol} from './Protocol';
import {PairPosition} from './PairPosition';
import {Pair, PairFactory} from './Pair';

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
  readonly positions: {
    readonly [id: string]: PairPosition;
  };
  readonly protocol: Protocol;

  constructor (game: GameSchedule) {
    this.tour = game.tour;
    this.table = game.table;
    this.deal = game.deal;
    this.dealer = <Position> game.dealer;
    this.players = {
      [Position.N]: PlayerFactory.create(game.players[Position.N]),
      [Position.E]: PlayerFactory.create(game.players[Position.E]),
      [Position.S]: PlayerFactory.create(game.players[Position.S]),
      [Position.W]: PlayerFactory.create(game.players[Position.W])
    };
    this.pairs = {
      [PairPosition.NS]: PairFactory.create(this.players[Position.N], this.players[Position.S]),
      [PairPosition.EW]: PairFactory.create(this.players[Position.E], this.players[Position.W])
    };
    this.positions = {
      [this.pairs[PairPosition.NS].id]: PairPosition.NS,
      [this.pairs[PairPosition.EW].id]: PairPosition.EW
    };
    this.pairs[this.pairs[PairPosition.NS].id] = this.pairs[PairPosition.NS];
    this.pairs[this.pairs[PairPosition.EW].id] = this.pairs[PairPosition.EW];
    this.protocol = new Protocol(this);
  }
}
