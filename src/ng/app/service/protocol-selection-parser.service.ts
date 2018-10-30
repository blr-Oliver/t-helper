import {Injectable} from '@angular/core';

@Injectable()
export class ProtocolSelectionParserService {
  private static readonly validOnly = range => !range.invalid;

  parse(selection: string, target: boolean[][]) {
    target.forEach(tour => tour.fill(false));

    const parts = selection.toUpperCase().trim().split(/\s*,\s*/);
    let ranges = parts.map(part => new SelectionRange(part));
    ranges = ranges.filter(ProtocolSelectionParserService.validOnly);
    if (ranges.length) {
      const tours = target.length, tables = target[0].length;
      ranges.forEach(range => {
        if (range.minTour == null && range.maxTour == null)
          [range.minTour, range.maxTour] = [1, tours];
        if (range.minTable == null && range.maxTable == null)
          [range.minTable, range.maxTable] = [1, tables];

        range.minTour = Math.max(range.minTour, 1);
        range.minTable = Math.max(range.minTable, 1);
        range.maxTour = Math.min(range.maxTour, tours);
        range.maxTable = Math.min(range.maxTable, tables);
        if (range.minTour > range.maxTour || range.minTable > range.maxTable)
          range.invalid = true;
      });

      ranges = ranges.filter(ProtocolSelectionParserService.validOnly);
      ranges.forEach(range => {
        for (let i = range.minTour - 1; i < range.maxTour; ++i)
          for (let j = range.minTable - 1; j < range.maxTable; ++j)
            target[i][j] = true;
      });
    }
  }
}

class SelectionRange {
  private static readonly ROMAN_DIGITS = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  minTour: number;
  maxTour: number;
  minTable: number;
  maxTable: number;
  invalid?: boolean;

  constructor(range: string) {
    const parts = range.split(/\s*-\s*/);
    switch (parts.length) {
      case 1:
        [this.minTour, this.minTable] = SelectionRange.parseToken(parts[0]);
        this.invalid = isNaN(this.minTour) || isNaN(this.minTable);
        break;
      case 2:
        [this.minTour, this.minTable] = SelectionRange.parseToken(parts[0]);
        [this.maxTour, this.maxTable] = SelectionRange.parseToken(parts[1]);
        this.invalid = isNaN(this.minTour) || isNaN(this.minTable) || isNaN(this.maxTour) || isNaN(this.maxTable);
        break;
      default:
        this.invalid = true;
    }
    if (this.invalid) return;
    if (this.minTour == null) this.minTour = this.maxTour;
    if (this.maxTour == null) this.maxTour = this.minTour;
    if (this.minTable == null) this.minTable = this.maxTable;
    if (this.maxTable == null) this.maxTable = this.minTable;
  }

  private static parseToken(token: string): [number, number] {
    const parts = /^(\d+)?\s*(\w+)?$/.exec(token);
    if (!parts) return [NaN, NaN];
    let tour = null, table = null;
    if (parts[1] != null) tour = +parts[1];
    if (parts[2] != null) table = this.parseRoman(parts[2]);
    return [tour, table];
  }

  private static parseRoman(input: string): number {
    let total = 0, prev = 0;
    for (let i = input.length - 1; i >= 0; --i) {
      const value = this.ROMAN_DIGITS[input[i]];
      if (!value) return NaN;
      total += value < prev ? -value : value; // subtract if necessary
      prev = value;
    }
    return total;
  }
}
