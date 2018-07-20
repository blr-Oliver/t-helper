import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../model/Game';

@Component({
  selector: 'protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {
  @Input() game: Game;
  gameId: string;

  constructor() {
  }

  ngOnInit() {
    this.gameId = 'game-' + this.game.tour + '-' + this.game.table;
  }
}
