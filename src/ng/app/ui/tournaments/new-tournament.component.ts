import {Component} from '@angular/core';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';

@Component({
  templateUrl: './new-tournament.component.html'
})
export class NewTournamentComponent {
  expandDescription = false;

  schedules: ScheduleDTO[] = [
    {
      id: 1,
      name: 'Короткий турнир на 4 пары',
      totalPairs: 4,
      totalTours: 12,
      totalTables: 2
    },
    {
      id: 2,
      name: 'Короткий турнир на 5 пар',
      totalPairs: 5,
      totalTours: 10,
      totalTables: 2
    },
    {
      id: 3,
      name: 'Двойной турнир на 4 пары',
      totalPairs: 4,
      totalTours: 24,
      totalTables: 2
    }
  ];

  create(data) {
    console.log(data);
  }
}
