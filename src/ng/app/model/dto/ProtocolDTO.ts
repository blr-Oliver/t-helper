import {DTO} from './DTO';
import {Suit} from '../Suit';
import {PairPosition} from '../PairPosition';

export interface ProtocolDTO extends DTO {
  tid: number; // tournament id
  gid: number; // game slot id
  suit?: Suit;
  owner?: PairPosition;
  level?: number;
  tricks?: number;
  lastModified?: number;
}
