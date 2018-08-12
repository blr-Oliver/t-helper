import {PlayerEntity} from './PlayerEntity';
import {PlayerSlot} from '../dto/PlayerSlot';

export class PairEntity {
  readonly name: string;
  private readonly players: [PlayerEntity, PlayerEntity];

  private static bySlotSorter: (a: PlayerEntity, b: PlayerEntity) => number = (a, b) => b.slot.localeCompare(a.slot);
  private static slotSorter: (a: PlayerSlot, b: PlayerSlot) => number = (a, b) => b.localeCompare(a);

  constructor(player1: PlayerEntity, player2: PlayerEntity) {
    this.players = [player1, player2];
    this.players.sort(PairEntity.bySlotSorter);
    this.name = this.players[0].slot + this.players[1].slot;
  }

  get [0](): PlayerEntity { return this.players[0]; }
  get [1](): PlayerEntity { return this.players[1]; }

  static nameFor(slot1: PlayerSlot, slot2: PlayerSlot): string {
    const sorted = [slot1, slot2].sort(this.slotSorter);
    return sorted[0] + sorted[1];
  }
}
