import {Component, Input} from '@angular/core';
import {Game} from '../../model/Game';

@Component({
  selector: 'protocol-print',
  templateUrl: './protocol-print.component.html',
  styleUrls: ['./protocol-print.component.scss']
})
export class ProtocolPrintComponent {
  @Input() game: Game;
}
