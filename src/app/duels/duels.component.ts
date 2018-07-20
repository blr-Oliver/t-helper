import {Component, Input, OnInit} from '@angular/core';
import {Duel} from '../model/Duel';
import {Pair} from '../model/Pair';

@Component({
  selector: '[data-duels]',
  templateUrl: './duels.component.html',
  styleUrls: ['./duels.component.scss']
})
export class DuelsComponent implements OnInit {
  @Input() duels: Duel[][][];
  @Input() pairs: Pair[];

  ngOnInit() {
  }

}
