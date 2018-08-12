import {PlayerSlot} from './PlayerSlot';
import {Seating} from '../Game';
import {Position} from '../Position';
import {DTO} from './DTO';

export interface GameSlotDTO extends DTO {
  sid: number; // schedule id
  tour: number;
  table: number;
  deal: number;
  dealer: Position;
  players: Seating<PlayerSlot>;
}
