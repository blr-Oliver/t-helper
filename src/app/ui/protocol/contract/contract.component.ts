import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contract} from '../../../model/Protocol';
import {UpdateEvent} from '../../../service/UpdateEvent';

@Component({
  selector: 'contract',
  templateUrl: './contract.component.html'
})
export class ContractComponent {
  @Input() gameId: string;
  @Input() contract: Contract;

  @Output() update: EventEmitter<UpdateEvent>;

  constructor() {
    this.update = new EventEmitter<UpdateEvent>(false);
  }

  onUpdate(property, newValue) {
    this.update.emit({
      type: 'property',
      currentValue: newValue
    });
  }
}
