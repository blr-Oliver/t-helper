import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  pure: false,
  name: 'flat'
})
export class FlatPipe implements PipeTransform {
  transform<T>(value: T[][], flags?: boolean[][]): T[] {
    if (!flags) return [].concat(...value);
    return [].concat(...value.map((x, i) => x.filter((_, j) => flags[i][j])));
  }
}
