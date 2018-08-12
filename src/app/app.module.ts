import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {PairsComponent} from './pairs/pairs.component';
import {GamesComponent} from './games/games.component';
import {DuelsComponent} from './duels/duels.component';
import {StandingsComponent} from './standings/standings.component';
import {PlayerComponent} from './player/player.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {ContractComponent} from './protocol/contract/contract.component';
import {TricksComponent} from './protocol/tricks/tricks.component';
import {TournamentListComponent} from './tournaments/tournament-list.component';
import {TournamentService} from './service/tournament.service';
import {TournamentDetailsComponent} from './tournaments/tournament-details.component';
import {HttpTournamentLoader} from './service/tournament-loader.service';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', component: TournamentListComponent},
  {
    path: ':id',
    children: [
      {path: '', pathMatch: 'full', component: TournamentDetailsComponent},
      {path: 'players', component: PairsComponent},
      {path: 'games', component: GamesComponent},
      {path: 'protocol/:tour/:table', component: ProtocolComponent},
      {path: 'protocol', component: ProtocolComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    TournamentListComponent,
    TournamentDetailsComponent,
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
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [
    TournamentService,
    {provide: 'TournamentLoader', useClass: HttpTournamentLoader}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
