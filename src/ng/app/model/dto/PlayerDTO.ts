import {DTO} from './DTO';
import {PlayerSlot} from './PlayerSlot';

export interface PlayerDTO extends DTO {
  tid: number; // tournament id
  slot: PlayerSlot;
  name?: string;
}
