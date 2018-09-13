import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../model/Player';
import {classAlias, Position} from '../../model/Position';
import {Game} from '../../model/Game';

@Component({
  selector: 'protocol-player',
  templateUrl: './protocol-player.component.html'
})

export class ProtocolPlayerComponent implements OnInit {
  @Input() game: Game;
  @Input() position: Position;

  positionClass: string;
  player: Player;
  dealer: boolean;

  ngOnInit() {
    this.positionClass = classAlias(this.position);
    this.player = this.game.players[this.position];
    this.dealer = this.game.gameSlot.dealer === this.position;
  }
}
