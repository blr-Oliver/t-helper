import {DTO} from './DTO';
import {PlayerSlot} from './PlayerSlot';

export class PlayerDTO extends DTO {
  tid: number; // tournament id
  slot: PlayerSlot;
  name: string;
}
