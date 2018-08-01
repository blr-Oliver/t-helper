import {inject, TestBed} from '@angular/core/testing';

import {TournamentService} from './tournament.service';

describe('TournamentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentService]
    });
  });

  it('should be created', inject([TournamentService], (service: TournamentService) => {
    expect(service).toBeTruthy();
  }));
});
