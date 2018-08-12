import {PlayerDTO} from '../dto/PlayerDTO';
import {PlayerSlot} from '../dto/PlayerSlot';

export class PlayerEntity {
  private readonly data: PlayerDTO;

  constructor(data: PlayerDTO) {
    this.data = data;
  }

  get name(): string { return this.data.name; }
  set name(value: string) { this.data.name = name; }

  get slot(): PlayerSlot { return this.data.slot; }

  get defined(): boolean {
    return !!this.data.name;
  }
}
