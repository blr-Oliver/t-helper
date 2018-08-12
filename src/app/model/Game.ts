import {Position} from './Position';
import {Player} from './Player';
import {Protocol} from './Protocol';
import {PairPosition} from './PairPosition';
import {Pair, PairRepository} from './Pair';
import {Tournament} from './Tournament';
import {Seating} from './Seating';

export interface GameSchedule {
  tour: number;
  table: number;
  deal: number;
  dealer?: string;
  players: Seating<string>;
}

export class Game {
  id?: number;
  readonly tour: number;
  readonly table: number;
  readonly deal: number;
  readonly dealer: Position;
  readonly players: Seating<Player>;
  readonly pairs: {
    readonly [PairPosition.NS]: Pair;
    readonly [PairPosition.EW]: Pair;
  };
  readonly tournament: Tournament;
  readonly protocol: Protocol;

  constructor(game: GameSchedule, players: { [id: string]: Player }, pairs: PairRepository, tournament: Tournament) {
    this.tournament = tournament;
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
