import {DTO} from './DTO';
import {PlayerSlot} from './PlayerSlot';
import {WithTimestamp} from './WithTimestamp';

export interface PlayerDTO extends DTO, WithTimestamp {
  tid: number; // tournament id
  slot: PlayerSlot;
  name?: string;
}
