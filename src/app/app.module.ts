import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { PlayersComponent } from './players/players.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DuelsComponent } from './duels/duels.component';
import { ScoresComponent } from './scores/scores.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    TabsComponent,
    PlayersComponent,
    ScheduleComponent,
    DuelsComponent,
    ScoresComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
