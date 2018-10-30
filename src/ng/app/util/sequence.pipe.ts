import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  pure: true,
  name: 'seq'
})
export class SequencePipe implements PipeTransform {
  transform(value: number): number[] {
    const result = Array(value).fill(0);
    result.forEach((_, i, a) => a[i] = i);
    return result;
  }
}
