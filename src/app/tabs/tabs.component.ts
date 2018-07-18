import {Component, Input, OnInit} from '@angular/core';
import {Tournament} from '../model/Tournament';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tournament: Tournament;

  ngOnInit() {
  }

}
