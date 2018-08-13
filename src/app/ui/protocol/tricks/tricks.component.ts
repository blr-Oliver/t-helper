import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tricks} from '../../../model/Protocol';
import {UpdateEvent} from '../../../service/UpdateEvent';

@Component({
  selector: 'tricks',
  templateUrl: './tricks.component.html'
})
export class TricksComponent {
  @Input() gameId: string;
  @Input() tricks: Tricks;
  @Output() update: EventEmitter<UpdateEvent>;

  constructor() {
    this.update = new EventEmitter<UpdateEvent>(false);
  }

  onUpdate(newValue) {
    this.update.emit({
      type: 'tricks',
      currentValue: newValue
    });
  }
}
