import {DTO} from './DTO';
import {PlayerSlot} from './PlayerSlot';
import {GameSlotDTO} from './GameSlotDTO';

export interface ScheduleDTO extends DTO {
  name: string;
  totalPairs: number;
  totalTours: number;
  totalTables: number;
  players: PlayerSlot[];
  games?: GameSlotDTO[];
}
