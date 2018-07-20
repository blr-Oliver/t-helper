import {Component, Input, OnInit} from '@angular/core';
import {Standings} from '../model/Standings';

@Component({
  selector: '[data-standings]',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  @Input() standings: Standings;

  ngOnInit() {
    this.standings.recompute();
  }

}
