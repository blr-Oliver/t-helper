export enum PairPosition {NS = 'NS', EW = 'EW'}
export function crossPosition(position: PairPosition): PairPosition {
  switch (position) {
    case PairPosition.NS: return PairPosition.EW;
    case PairPosition.EW: return PairPosition.NS;
  }
}
