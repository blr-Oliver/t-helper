import {Game} from './Game';
import {Contract} from './Contract';
import {Tricks} from './Tricks';
import {GamePoints} from './GamePoints';

export class Protocol {
  readonly game: Game;
  readonly contract: Contract;
  readonly tricks: Tricks;
  readonly points: GamePoints;

  constructor(game: Game) {
    this.game = game;
    this.contract = new Contract();
    this.tricks = new Tricks();
    this.points = new GamePoints(this.contract, this.tricks);
  }

  get defined(): boolean {
    return this.contract.defined && this.tricks.defined;
  }
}
