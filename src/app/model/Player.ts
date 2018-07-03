export class Player {
  readonly id: string;
  name: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class PlayerFactory {
  private static allPlayers: {[id: string]: Player} = {};
  static create(id: string): Player {
    if (!(id in this.allPlayers)) {
      this.allPlayers[id] = new Player(id);
    }
    return this.allPlayers[id];
  }
}
