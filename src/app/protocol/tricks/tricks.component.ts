import {Component, Input, OnInit} from '@angular/core';
import {Tricks} from '../../model/ProtocolEntity';

@Component({
  selector: 'tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.scss']
})
export class TricksComponent implements OnInit {
  @Input() gameId: string;
  @Input() tricks: Tricks;

  ngOnInit() {
  }
}
