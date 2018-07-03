import {Player} from './Player';

export class Pair {
  readonly id: string;
  readonly 0: Player;
  readonly 1: Player;
}

export class PairFactory {
  private static allPairs: {[id: string]: Pair} = {};
  static create(first: Player, second: Player): Pair {
    if (first.id < second.id) { return this.create(second, first); }
    const id = [first.id, second.id].join('');
    if (!(id in this.allPairs)) {
      this.allPairs[id] = {
        id: id,
        0: first,
        1: second,
        [first.id]: first,
        [second.id]: second,
      };
    }
    return this.allPairs[id];
  }
}
