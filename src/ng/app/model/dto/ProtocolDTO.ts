import {DTO} from './DTO';
import {Suit} from '../Suit';
import {PairPosition} from '../PairPosition';
import {WithTimestamp} from './WithTimestamp';

export interface ProtocolDTO extends DTO, WithTimestamp {
  tid: number; // tournament id
  gid: number; // game slot id
  suit?: Suit;
  owner?: PairPosition;
  level?: number;
  tricks?: number;
}
