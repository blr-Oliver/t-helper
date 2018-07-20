import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../model/Game';

@Component({
  selector: '[data-games]',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  @Input() games: Game[][];
  ngOnInit() {
  }
}
