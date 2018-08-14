import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Player} from '../../../model/Player';
import {UpdateEvent} from '../../../service/UpdateEvent';

@Component({
  selector: 'player',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  @Input() player: Player;
  @Output() update: EventEmitter<UpdateEvent>;

  constructor() {
    this.update = new EventEmitter<UpdateEvent>(false);
  }

  onUpdate(newValue) {
    this.update.emit({
      type: 'player',
      subject: this.player.data,
      property: 'name',
      currentValue: newValue
    });
  }
}
