import {GameSlotDTO} from './dto/GameSlotDTO';
import {Position} from './Position';
import {UnmodifiableSeating} from './Seating';
import {PairPosition} from './PairPosition';
import {Pair} from './Pair';
import {Player} from './Player';
import {Protocol} from './Protocol';
import {ProtocolDTO} from './dto/ProtocolDTO';
import {PairSeating} from './PairSeating';
import {ProgressiveGameScoring} from './GameScoring';

export type PairMap = {
  [name: string]: Pair;
};

export type PlayerMap = {
  [slot: string]: Player;
};

export class Game {
  readonly pairs: PairSeating<Pair>;
  readonly players: UnmodifiableSeating<Player>;
  readonly protocol: Protocol;
  readonly points: GamePoints;
  readonly gameSlot: GameSlotDTO;

  constructor(
    gameSlot: GameSlotDTO,
    protocol: ProtocolDTO,
    pairs: PairSeating<Pair>,
    players: UnmodifiableSeating<Player>
  ) {
    this.gameSlot = gameSlot;
    this.protocol = new Protocol(protocol);
    this.pairs = pairs;
    this.players = players;
    this.points = new GamePoints(this);
  }

  get tour(): number { return this.gameSlot.tour; }
  get table(): number { return this.gameSlot.table; }
  get deal(): number { return this.gameSlot.deal; }
  get dealer(): Position { return this.gameSlot.dealer; }

  static create(
    gameSlot: GameSlotDTO,
    protocol: ProtocolDTO,
    allPairs: PairMap,
    allPlayers: PlayerMap
  ): Game {
    const players: UnmodifiableSeating<Player> = {
      [Position.N]: allPlayers[gameSlot.players[Position.N]],
      [Position.E]: allPlayers[gameSlot.players[Position.E]],
      [Position.S]: allPlayers[gameSlot.players[Position.S]],
      [Position.W]: allPlayers[gameSlot.players[Position.W]]
    };
    const pairs: PairSeating<Pair> = {
      [PairPosition.NS]: allPairs[Pair.nameFor(players[Position.N].slot, players[Position.S].slot)],
      [PairPosition.EW]: allPairs[Pair.nameFor(players[Position.E].slot, players[Position.W].slot)]
    };
    return new Game(gameSlot, protocol, pairs, players);
  }

  getPosition(pair: Pair): PairPosition {
    if (this.pairs[PairPosition.NS] === pair) return PairPosition.NS;
    if (this.pairs[PairPosition.EW] === pair) return PairPosition.EW;
  }
}

export class GamePoints {
  private readonly _enclosed: Game;

  constructor(enclosed: Game) {
    this._enclosed = enclosed;
  }

  get [PairPosition.NS] () {
    return ProgressiveGameScoring.instance.compute(this._enclosed.protocol, PairPosition.NS);
  }
  get [PairPosition.EW] () {
    return ProgressiveGameScoring.instance.compute(this._enclosed.protocol, PairPosition.EW);
  }
}
