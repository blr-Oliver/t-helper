import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../../model/Game';
import {Player} from '../../../model/Player';
import {Position} from '../../../model/Position';

@Component({
  selector: '.player-seat',
  templateUrl: './protocol-player.component.html'
})

export class ProtocolPlayerComponent implements OnInit {
  @Input() game: Game;
  @Input() position: Position;

  player: Player;
  dealer: boolean;

  ngOnInit() {
    this.player = this.game ? this.game.players[this.position] : null;
    this.dealer = this.game ? this.game.gameSlot.dealer === this.position : false;
  }
}
