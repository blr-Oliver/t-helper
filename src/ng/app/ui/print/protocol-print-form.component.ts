import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Game} from '../../model/Game';

@Component({
  selector: 'protocol-print-form',
  templateUrl: './protocol-print-form.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProtocolPrintFormComponent {
  @Input() game: Game;
}
