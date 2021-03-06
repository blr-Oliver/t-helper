import {DTO} from './DTO';
import {ScheduleDTO} from './ScheduleDTO';
import {PlayerDTO} from './PlayerDTO';
import {ProtocolDTO} from './ProtocolDTO';
import {WithTimestamp} from './WithTimestamp';

export interface TournamentDTO extends DTO, WithTimestamp {
  sid: number; // schedule id;
  name: string;
  description?: string;
  dateCreated: Date;
  status: string;
}

export interface ExpandedTournamentDTO extends TournamentDTO {
  schedule: ScheduleDTO;
  players: PlayerDTO[];
  protocols: ProtocolDTO[];
}
