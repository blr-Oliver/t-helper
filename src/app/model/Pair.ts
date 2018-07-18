import {Player} from './Player';

export class Pair {
  id: number;
  name: string;
  readonly players: [Player, Player];

  constructor(player1: Player, player2: Player) {
    this.players = [player1, player2];
    this.players.sort((a, b) => b.id.localeCompare(a.id));
    this.name = this.players[0].id + this.players[1].id;
  }
}

export interface PairRepository {
  find(first: Player): Pair;
}
