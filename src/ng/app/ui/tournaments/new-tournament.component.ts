import {Component, OnInit} from '@angular/core';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';
import {RestAPIFacade} from '../../service/api/APIFacade';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  templateUrl: './new-tournament.component.html'
})
export class NewTournamentComponent implements OnInit {
  expandDescription = false;
  schedules$: Observable<ScheduleDTO[]>;

  constructor(
    private apiFacade: RestAPIFacade,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.schedules$ = this.apiFacade.getScheduleList();
  }

  create(data) {
    this.apiFacade.createTournament(data).subscribe(
      tournament => this.router.navigate(['/', tournament.id])
    );
  }
}
