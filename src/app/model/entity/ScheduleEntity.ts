import {ScheduleDTO} from '../dto/ScheduleDTO';
import {PlayerSlot} from '../dto/PlayerSlot';

export class ScheduleEntity {
  readonly data: ScheduleDTO;

  constructor(data: ScheduleDTO) {
    this.data = data;
  }

  get name() { return this.data.name; }
  get totalPairs() { return this.data.totalPairs; }
  get totalTours() { return this.data.totalTours; }
  get totalTables() { return this.data.totalTables; }
  get slots(): ReadonlyArray<PlayerSlot> { return this.data.players; }
}
