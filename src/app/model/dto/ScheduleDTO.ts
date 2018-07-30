import {DTO} from './DTO';
import {PlayerSlot} from './PlayerSlot';

export class ScheduleDTO extends DTO {
  name: string;
  totalPairs: number;
  totalTours: number;
  totalTables: number;
  players: PlayerSlot[];
}
