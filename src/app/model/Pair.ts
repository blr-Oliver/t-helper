import {Player} from './Player';
import {PlayerSlot} from './dto/PlayerSlot';

export class Pair {
  readonly name: string;
  private readonly _players: [Player, Player];

  private static bySlotSorter: (a: Player, b: Player) => number = (a, b) => b.slot.localeCompare(a.slot);
  private static slotSorter: (a: PlayerSlot, b: PlayerSlot) => number = (a, b) => b.localeCompare(a);

  constructor(player1: Player, player2: Player) {
    this._players = [player1, player2];
    this._players.sort(Pair.bySlotSorter);
    this.name = this._players[0].slot + this._players[1].slot;
  }

  get [0](): Player { return this._players[0]; }
  get [1](): Player { return this._players[1]; }

  get defined () {
    return this._players[0].defined && this._players[1].defined;
  }

  static nameFor(slot1: PlayerSlot, slot2: PlayerSlot): string {
    const sorted = [slot1, slot2].sort(this.slotSorter);
    return sorted[0] + sorted[1];
  }
}
