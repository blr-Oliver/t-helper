import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Game} from '../../model/Game';

@Component({
  selector: 'protocol-print',
  templateUrl: './protocol-print.component.html',
  styleUrls: ['./protocol-print.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProtocolPrintComponent {
  @Input() game: Game;
}
