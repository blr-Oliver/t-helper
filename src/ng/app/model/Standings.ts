import {Pair} from './Pair';

export interface StandingsRecord {
  pair: Pair;
  duelScore: number;
  bonusScore: number;
  rank: number;
}

export class Standings {
  readonly records: CachingPairSummary[];
  sortProperty = 'rank';

  constructor(summaries: StandingsRecord[]) {
    this.records = summaries.map(s => new CachingPairSummary(s));
  }

  recompute(): void {
    this.records.forEach(r => r.reset());
    this.setRanks();
    this.records.sort(RecordComparators.by[this.sortProperty]);
  }

  setRanks(): void {
    this.records.sort(RecordComparators.byScore);
    this.records.reduce(function (rank, record, i, all) {
      if (i && RecordComparators.byScore(record, all[i - 1])) rank++;
      return record.rank = rank;
    }, 1);
  }
}

export type RecordComparator = (a: StandingsRecord, b: StandingsRecord) => number;

export namespace RecordComparators {
  export const byScore: RecordComparator = function (a: StandingsRecord, b: StandingsRecord): number {
    return (b.duelScore + b.bonusScore) - (a.duelScore + a.bonusScore) ||
      b.duelScore - a.duelScore;
  };
  export const byDuelScore: RecordComparator = function (a: StandingsRecord, b: StandingsRecord): number {
    return b.duelScore - a.duelScore || a.pair.name.localeCompare(b.pair.name);
  };
  export const byBonusScore: RecordComparator = function (a: StandingsRecord, b: StandingsRecord): number {
    return b.bonusScore - a.bonusScore || a.pair.name.localeCompare(b.pair.name);
  };
  export const byRank: RecordComparator = function (a: StandingsRecord, b: StandingsRecord): number {
    return a.rank - b.rank || a.pair.name.localeCompare(b.pair.name);
  };
  export const byPair: RecordComparator = function (a: StandingsRecord, b: StandingsRecord): number {
    return a.pair.name.localeCompare(b.pair.name);
  };
  export const by: { [id: string]: RecordComparator } = {
    'score': byScore,
    'duelScore': byDuelScore,
    'bonusScore': byBonusScore,
    'rank': byRank,
    'pair': byPair,
  };
}

class CachingPairSummary implements StandingsRecord {
  rank: number;
  private readonly delegate: StandingsRecord;

  constructor(delegate: StandingsRecord) {
    this.delegate = delegate;
  }

  private _duelScore: number;

  get duelScore(): number {
    if (this._duelScore == null) {
      this._duelScore = this.delegate.duelScore;
    }
    return this._duelScore;
  }

  private _bonusScore: number;

  get bonusScore(): number {
    if (this._bonusScore == null) {
      this._bonusScore = this.delegate.bonusScore;
    }
    return this._bonusScore;
  }

  get pair(): Pair {
    return this.delegate.pair;
  }

  reset(): void {
    this._duelScore = null;
    this._bonusScore = null;
    this.rank = null;
  }
}
