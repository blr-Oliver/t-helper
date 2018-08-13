import {Component, Input, OnInit} from '@angular/core';
import {PlayerDTO} from '../../model/dto/PlayerDTO';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: PlayerDTO;

  ngOnInit() {
  }
}
