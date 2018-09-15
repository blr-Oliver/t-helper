import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../model/Player';
import {UpdateManager} from '../../../service/UpdateManager';
import {UpdateEventDebounceBarrier} from '../../../service/DebounceBarrier';
import {PlayerDTO} from '../../../model/dto/PlayerDTO';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styles: [`
    .player-label {
      margin: 0;
      padding-right: 0;
      flex: 0 0 1em;
      align-self: center;
      text-align: right;
      font-weight: bold;
    }
  `]
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  private debounceBarrier: UpdateEventDebounceBarrier<PlayerDTO>;

  constructor(
    private updateManager: UpdateManager
  ) {
    this.debounceBarrier = new UpdateEventDebounceBarrier<PlayerDTO>(
      600,
      ['name'],
      event => this.updateManager.registerUpdate(event)
    );
  }

  ngOnInit() {
    this.debounceBarrier.init(this.player.data);
  }

  onUpdate(newValue) {
    this.debounceBarrier.next({
      type: 'player',
      subject: this.player.data,
      property: 'name',
      currentValue: newValue
    });
  }
}
