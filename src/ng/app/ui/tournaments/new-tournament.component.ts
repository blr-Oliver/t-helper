import {Component, Inject, OnInit} from '@angular/core';
import {ScheduleDTO} from '../../model/dto/ScheduleDTO';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Persister} from '../../service/api/Persister';

@Component({
  templateUrl: './new-tournament.component.html'
})
export class NewTournamentComponent implements OnInit {
  expandDescription = false;
  schedules$: Observable<ScheduleDTO[]>;

  constructor(
    @Inject('Persister') private persister: Persister,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.schedules$ = this.persister.getScheduleList();
  }

  create(data) {
    this.persister.createTournament(data).subscribe(
      tournament => this.router.navigate(['/', tournament.id])
    );
  }
}
