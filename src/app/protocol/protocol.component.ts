import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProtocolDTO} from '../model/dto/ProtocolDTO';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../service/tournament.service';
import {map, switchMap} from 'rxjs/operators';
import {ExpandedTournamentDTO} from '../model/dto/TournamentDTO';

@Component({
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {
  protocol$: Observable<ProtocolDTO>;
  private tournamentId: number;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const self = this;
    this.route.parent.paramMap.subscribe(params => this.tournamentId = +params.get('id'));
    this.protocol$ = this.route.paramMap.pipe(
      switchMap(function (params) {
        const tour = +params.get('tour'), table = +params.get('table');
        return self.tournamentService.get(self.tournamentId).pipe(
          map(function (t: ExpandedTournamentDTO) {
            const match = t.schedule.games.find(g => g.tour === tour && g.table === table);
            if (match)
              return t.protocols.find(p => p.gid === match.id);
          })
        );
      })
    );
  }
}
