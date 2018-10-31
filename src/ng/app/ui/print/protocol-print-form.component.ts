import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Game} from '../../model/Game';

@Component({
  selector: 'protocol-print-form',
  templateUrl: './protocol-print-form.component.html',
  styleUrls: ['./protocol-print-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProtocolPrintFormComponent {
  @Input() game: Game;
}
