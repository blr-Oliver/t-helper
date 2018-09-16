import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Game} from '../../../model/Game';

@Component({
  selector: 'protocol-template',
  templateUrl: './protocol-template.component.html',
  styleUrls: ['./protocol-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProtocolTemplateComponent {
  @Input() game: Game;
}
