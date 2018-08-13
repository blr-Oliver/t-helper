import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TopMenuComponent} from './ui/top-menu/top-menu.component';
import {PairsComponent} from './ui/pairs/pairs.component';
import {ScheduleComponent} from './ui/schedule/schedule.component';
import {StandingsComponent} from './ui/standings/standings.component';
import {PlayerComponent} from './ui/pairs/player/player.component';
import {ProtocolComponent} from './ui/protocol/protocol.component';
import {ContractComponent} from './ui/protocol/contract/contract.component';
import {TricksComponent} from './ui/protocol/tricks/tricks.component';
import {TournamentListComponent} from './ui/tournaments/tournament-list.component';
import {TournamentService} from './service/tournament.service';
import {TournamentDetailsComponent} from './ui/tournaments/tournament-details.component';
import {HttpTournamentLoader} from './service/tournament-loader.service';
import {DuelsComponent} from './ui/duels/duels.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', component: TournamentListComponent},
  {
    path: ':id',
    children: [
      {path: '', pathMatch: 'full', component: TournamentDetailsComponent},
      {path: 'players', component: PairsComponent},
      {path: 'games', component: ScheduleComponent},
      {path: 'protocol/:tour/:table', component: ProtocolComponent},
      {path: 'protocol/:partial', redirectTo: 'protocol/1/1'},
      {path: 'protocol', redirectTo: 'protocol/1/1'},
      {path: 'duels', component: DuelsComponent},
      {path: 'standings', component: StandingsComponent},
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
    ScheduleComponent,
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
