import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../model/Player';
import {Position} from '../../model/Position';
import {Game} from '../../model/Game';

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
    this.player = this.game.players[this.position];
    this.dealer = this.game.gameSlot.dealer === this.position;
  }
}
