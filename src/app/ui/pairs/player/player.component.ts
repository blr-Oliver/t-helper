import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../model/Player';

@Component({
  selector: 'player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;

  ngOnInit() {
  }
}
