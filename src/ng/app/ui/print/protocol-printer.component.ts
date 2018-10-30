import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Game} from '../../model/Game';

@Component({
  selector: 'protocol-printer',
  templateUrl: './protocol-printer.component.html',
  styleUrls: ['./protocol-printer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProtocolPrinterComponent {
  @Input() games: Game[];
  @Input() blanks: number;
}
