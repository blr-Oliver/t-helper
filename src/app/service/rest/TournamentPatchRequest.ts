import {PlayerDTO} from '../../model/dto/PlayerDTO';
import {ProtocolDTO} from '../../model/dto/ProtocolDTO';
import {TournamentDTO} from '../../model/dto/TournamentDTO';

export interface TournamentPatchRequest {
  tid: number;
  update: {
    tournament?: TournamentDTO;
    players?: PlayerDTO[];
    protocols?: ProtocolDTO[];
  };
}
