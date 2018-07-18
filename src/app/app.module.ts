import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {TabsComponent} from './tabs/tabs.component';
import {PairsComponent} from './pairs/pairs.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {DuelsComponent} from './duels/duels.component';
import {ScoresComponent} from './scores/scores.component';
import {PlayerComponent} from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    TabsComponent,
    PairsComponent,
    ScheduleComponent,
    DuelsComponent,
    ScoresComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
