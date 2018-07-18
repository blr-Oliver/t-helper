import {Player} from './Player';

export class Pair {
  id: number;
  name: string;
  readonly players: [Player, Player];

  constructor(player1: Player, player2: Player) {
    this.players = [player1, player2];
    this.players.sort((a, b) => a.id.localeCompare(b.id));
  }
}

export interface PairRepository {
  find(first: Player): Pair;
}
