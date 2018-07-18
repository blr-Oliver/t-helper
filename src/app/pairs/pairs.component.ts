import {Component, Input, OnInit} from '@angular/core';
import {Pair} from '../model/Pair';

@Component({
  selector: '[data-players]',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})
export class PairsComponent implements OnInit {
  @Input() pairs: Pair[];
  constructor() { }

  ngOnInit() {
  }

}
