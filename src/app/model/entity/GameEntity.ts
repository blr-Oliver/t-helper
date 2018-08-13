import {GameSlotDTO} from '../dto/GameSlotDTO';
import {Position} from '../Position';
import {UnmodifiableSeating} from '../Seating';
import {PairPosition} from '../PairPosition';
import {PairEntity} from './PairEntity';
import {PlayerEntity} from './PlayerEntity';
import {ProtocolEntity} from './ProtocolEntity';
import {ProtocolDTO} from '../dto/ProtocolDTO';
import {PairSeating} from '../PairSeating';
import {ProgressiveGameScoring} from '../GameScoring';

export type PairMap = {
  [name: string]: PairEntity;
};

export type PlayerMap = {
  [slot: string]: PlayerEntity;
};

export class GameEntity {
  readonly pairs: PairSeating<PairEntity>;
  readonly players: UnmodifiableSeating<PlayerEntity>;
  readonly protocol: ProtocolEntity;
  readonly points: GamePoints;
  private readonly gameSlot: GameSlotDTO;

  constructor(
    gameSlot: GameSlotDTO,
    protocol: ProtocolDTO,
    pairs: PairSeating<PairEntity>,
    players: UnmodifiableSeating<PlayerEntity>
  ) {
    this.gameSlot = gameSlot;
    this.protocol = new ProtocolEntity(protocol);
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
  ): GameEntity {
    const players: UnmodifiableSeating<PlayerEntity> = {
      [Position.N]: allPlayers[gameSlot.players[Position.N]],
      [Position.E]: allPlayers[gameSlot.players[Position.E]],
      [Position.S]: allPlayers[gameSlot.players[Position.S]],
      [Position.W]: allPlayers[gameSlot.players[Position.W]]
    };
    const pairs: PairSeating<PairEntity> = {
      [PairPosition.NS]: allPairs[PairEntity.nameFor(players[Position.N].slot, players[Position.S].slot)],
      [PairPosition.EW]: allPairs[PairEntity.nameFor(players[Position.E].slot, players[Position.W].slot)]
    };
    return new GameEntity(gameSlot, protocol, pairs, players);
  }

  getPosition(pair: PairEntity): PairPosition {
    if (this.pairs[PairPosition.NS] === pair) return PairPosition.NS;
    if (this.pairs[PairPosition.EW] === pair) return PairPosition.EW;
  }
}

export class GamePoints {
  private readonly _enclosed: GameEntity;

  constructor(enclosed: GameEntity) {
    this._enclosed = enclosed;
  }

  get [PairPosition.NS] () {
    return ProgressiveGameScoring.instance.compute(this._enclosed.protocol, PairPosition.NS);
  }
  get [PairPosition.EW] () {
    return ProgressiveGameScoring.instance.compute(this._enclosed.protocol, PairPosition.EW);
  }
}
