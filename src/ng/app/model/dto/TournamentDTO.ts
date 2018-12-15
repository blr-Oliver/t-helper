import {DTO} from './DTO';
import {ScheduleDTO} from './ScheduleDTO';
import {PlayerDTO} from './PlayerDTO';
import {ProtocolDTO} from './ProtocolDTO';

export interface TournamentDTO extends DTO {
  sid: number; // schedule id;
  name: string;
  description?: string;
  dateCreated: Date;
  status: string;
  lastModified?: number;
}

export interface ExpandedTournamentDTO extends TournamentDTO {
  schedule: ScheduleDTO;
  players: PlayerDTO[];
  protocols: ProtocolDTO[];
}
