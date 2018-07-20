import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {TabsComponent} from './tabs/tabs.component';
import {PairsComponent} from './pairs/pairs.component';
import {GamesComponent} from './games/games.component';
import {DuelsComponent} from './duels/duels.component';
import {StandingsComponent} from './standings/standings.component';
import {PlayerComponent} from './player/player.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {ContractComponent} from './protocol/contract/contract.component';
import {TricksComponent} from './protocol/tricks/tricks.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    TabsComponent,
    PairsComponent,
    GamesComponent,
    DuelsComponent,
    StandingsComponent,
    PlayerComponent,
    ProtocolComponent,
    ContractComponent,
    TricksComponent
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
