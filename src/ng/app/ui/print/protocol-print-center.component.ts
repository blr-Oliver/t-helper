import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Game} from '../../model/Game';

@Component({
  selector: 'protocol-print-center',
  templateUrl: './protocol-print-center.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProtocolPrintCenterComponent {
  @Input() game: Game;
}
