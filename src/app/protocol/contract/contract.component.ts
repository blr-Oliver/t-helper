import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../../model/entity/ProtocolEntity';

@Component({
  selector: 'contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @Input() gameId: string;
  @Input() contract: Contract;

  ngOnInit() {
  }
}
