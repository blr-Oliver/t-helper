import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './ui/app.component';
import {TopMenuComponent} from './ui/top-menu/top-menu.component';
import {PairsComponent} from './ui/pairs/pairs.component';
import {ScheduleComponent} from './ui/schedule/schedule.component';
import {StandingsComponent} from './ui/standings/standings.component';
import {PlayerComponent} from './ui/pairs/player/player.component';
import {ProtocolEditorComponent} from './ui/protocol/protocol-editor.component';
import {ContractComponent} from './ui/protocol/contract/contract.component';
import {TricksComponent} from './ui/protocol/tricks/tricks.component';
import {TournamentListComponent} from './ui/tournaments/tournament-list.component';
import {TournamentProvider} from './service/TournamentProvider';
import {TournamentDetailsComponent} from './ui/tournaments/tournament-details.component';
import {DuelsComponent} from './ui/duels/duels.component';
import {UpdateManager} from './service/UpdateManager';
import {NewTournamentComponent} from './ui/tournaments/new-tournament.component';
import {ProtocolTemplateComponent} from './ui/protocol/template/protocol-template.component';
import {ProtocolPrinterComponent} from './ui/print/protocol-printer.component';
import {ProtocolPlayerComponent} from './ui/protocol/template/protocol-player.component';
import {RomanPipe} from './util/roman.pipe';
import {RouteNameTracker} from './service/RouteNameTracker';
import {ProtocolPrintFormComponent} from './ui/print/protocol-print-form.component';
import {ProtocolSelectorComponent} from './ui/print/protocol-selector.component';
import {SequencePipe} from './util/sequence.pipe';
import {FlatPipe} from './util/flat.pipe';
import {ProtocolSelectionParser} from './service/ProtocolSelectionParser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IndexedDBPersister} from './service/persister/IndexedDBPersister';
import {IndexedDBProvider} from './service/persister/IndexedDBProvider';
import {BaseUrlHttpInterceptor} from './service/BaseUrlHttpInterceptor';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', component: TournamentListComponent,
    resolve: {state: RouteNameTracker}, data: {name: 'home'}
  },
  {
    path: 'new', component: NewTournamentComponent,
    resolve: {state: RouteNameTracker}, data: {name: 'new'}
  },
  {
    path: ':id',
    children: [
      {
        path: '', pathMatch: 'full', component: TournamentDetailsComponent,
        resolve: {state: RouteNameTracker}, data: {name: 'details'}
      },
      {
        path: 'print', component: ProtocolSelectorComponent,
        resolve: {state: RouteNameTracker}, data: {name: 'print'}
      },
      {
        path: 'players', component: PairsComponent,
        resolve: {state: RouteNameTracker}, data: {name: 'players'}
      },
      {
        path: 'games', component: ScheduleComponent,
        resolve: {state: RouteNameTracker}, data: {name: 'schedule'}
      },
      {
        path: 'protocol/:tour/:table', component: ProtocolEditorComponent,
        resolve: {state: RouteNameTracker}, data: {name: 'games'}
      },
      {path: 'protocol/:partial', redirectTo: 'protocol/1/1'},
      {path: 'protocol', redirectTo: 'protocol/1/1'},
      {
        path: 'duels', component: DuelsComponent,
        resolve: {state: RouteNameTracker}, data: {name: 'duels'}
      },
      {
        path: 'standings', component: StandingsComponent,
        resolve: {state: RouteNameTracker}, data: {name: 'standings'}
      },
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
    ProtocolEditorComponent,
    ContractComponent,
    TricksComponent,
    NewTournamentComponent,
    ProtocolPrinterComponent,
    ProtocolTemplateComponent,
    ProtocolPlayerComponent,
    ProtocolPrintFormComponent,
    ProtocolSelectorComponent,
    RomanPipe,
    FlatPipe,
    SequencePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: http => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TournamentProvider,
    ProtocolSelectionParser,
    {provide: 'Persister', useClass: IndexedDBPersister},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlHttpInterceptor, multi: true},
    IndexedDBProvider,
    UpdateManager,
    RouteNameTracker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
