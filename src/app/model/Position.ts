export enum Position { N = 'N', E = 'E', S = 'S', W = 'W' }
export namespace Position {
  export const values: Position[] = [ Position.N, Position.E, Position.S, Position.W ];
}
export function opposite(position: Position): Position {
  switch (position) {
    case Position.N: return Position.S;
    case Position.E: return Position.W;
    case Position.S: return Position.N;
    case Position.W: return Position.E;
  }
}
