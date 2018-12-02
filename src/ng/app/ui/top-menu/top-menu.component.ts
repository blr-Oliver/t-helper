import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TournamentProvider} from '../../service/TournamentProvider';
import {Observable} from 'rxjs';
import {RouteNameTracker} from '../../service/RouteNameTracker';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit, OnDestroy {
  tournamentId$: Observable<number>;
  expanded = false;
  nameTracker: RouteNameTracker;
  translateService: TranslateService;
  langExpanded = false;
  private langHider;
  private listener;

  constructor(
    private tournamentService: TournamentProvider,
    nameTracker: RouteNameTracker,
    translateService: TranslateService,
    private renderer: Renderer2
  ) {
    this.nameTracker = nameTracker;
    this.translateService = translateService;
    this.langHider = () => this.hideLangList();
  }

  ngOnInit() {
    this.tournamentId$ = this.tournamentService.getCurrentId();
    this.initLanguage();
  }

  ngOnDestroy(): void {
    this.hideLangList();
  }

  showLangList() {
    this.langExpanded = true;
    setTimeout(() => {
      this.listener = this.renderer.listen('document', 'click', this.langHider);
    }, 0);
  }

  hideLangList() {
    this.langExpanded = false;
    if (this.listener) this.listener();
  }

  useLang(lang: string) {
    this.translateService.use(lang);
  }

  private initLanguage() {
    const preferredLanguage = this.translateService.getBrowserLang();
    for (const lang of this.translateService.getLangs()) {
      if (lang === preferredLanguage) {
        this.translateService.use(lang);
        break;
      }
    }
  }

}
