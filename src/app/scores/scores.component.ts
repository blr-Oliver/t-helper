import {Component, Input, OnInit} from '@angular/core';
import {Standings} from '../model/Standings';

@Component({
  selector: '[data-scores]',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  @Input() standings: Standings;

  ngOnInit() {
  }

}
