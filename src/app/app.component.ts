import {Component} from '@angular/core';
import {Tournament} from './model/Tournament';
import schedule4 from '../data/Schedule-4.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tournament: Tournament;

  constructor() {
    this.tournament = new Tournament(<any> schedule4);
    console.log(this.tournament);
  }
}
