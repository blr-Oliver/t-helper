import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './ui/app.component';
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
import {DuelsComponent} from './ui/duels/duels.component';
import {UpdateManager} from './service/UpdateManager';
import {NewTournamentComponent} from './ui/tournaments/new-tournament.component';
import {RestAPIFacade} from './service/api/APIFacade';
import {ProtocolPrintComponent} from './ui/print/protocol-print.component';
import {ProtocolListComponent} from './ui/print/protocol-list.component';
import {ProtocolPlayerComponent} from './ui/print/protocol-player.component';
import {RomanPipe} from './util/roman.pipe';
import {RouteNameTracker} from './service/RouteNameTracker';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', component: TournamentListComponent,
    resolve: { state: RouteNameTracker }, data: { name: 'home' }},
  {path: 'new', component: NewTournamentComponent,
    resolve: { state: RouteNameTracker }, data: { name: 'new' }},
  {
    path: ':id',
    children: [
      {path: '', pathMatch: 'full', component: TournamentDetailsComponent,
        resolve: { state: RouteNameTracker }, data: { name: 'details' }},
      {path: 'print', component: ProtocolListComponent,
        resolve: { state: RouteNameTracker }, data: { name: 'print' }},
      {path: 'players', component: PairsComponent,
        resolve: { state: RouteNameTracker }, data: { name: 'players' }},
      {path: 'games', component: ScheduleComponent,
        resolve: { state: RouteNameTracker }, data: { name: 'schedule' }},
      {path: 'protocol/:tour/:table', component: ProtocolComponent,
        resolve: { state: RouteNameTracker }, data: { name: 'game' }},
      {path: 'protocol/:partial', redirectTo: 'protocol/1/1'},
      {path: 'protocol', redirectTo: 'protocol/1/1'},
      {path: 'duels', component: DuelsComponent,
        resolve: { state: RouteNameTracker }, data: { name: 'duels' }},
      {path: 'standings', component: StandingsComponent,
        resolve: { state: RouteNameTracker }, data: { name: 'standings' }},
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
    TricksComponent,
    NewTournamentComponent,
    ProtocolListComponent,
    ProtocolPrintComponent,
    ProtocolPlayerComponent,
    RomanPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [
    TournamentService,
    RestAPIFacade,
    UpdateManager,
    RouteNameTracker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
