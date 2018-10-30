import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  pure: true,
  name: 'roman'
})
export class RomanPipe implements PipeTransform {
  private static SYMBOLS: string[] = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  private static WRITINGS: number[][] = [
    [],
    [0],
    [0, 0],
    [0, 0, 0],
    [1, 0],
    [1],
    [0, 1],
    [0, 0, 1],
    [0, 0, 0, 1],
    [2, 0]
  ];

  transform(value: number): string {
    if (value == null) return '';
    value = ~~+value; // stripe off decimal part
    if (value === 0) return '0';
    let i;
    const digits: number[] = [];
    const output: string[] = [];
    for (i = 2; value > 0 && i <= RomanPipe.SYMBOLS.length; i += 2) {
      const digit = value % 10;
      digits.push(digit);
      value = (value - digit) / 10;
    }
    if (value > 0) digits.push(value);
    for (i = 2; digits.length > 0 && i <= RomanPipe.SYMBOLS.length; i += 2) {
      output.push(...RomanPipe.WRITINGS[digits.shift()].map(j => RomanPipe.SYMBOLS[j + i - 2]));
    }
    if (digits.length > 0)
      output.push(...Array(digits[0]).fill(RomanPipe.SYMBOLS[i - 2]));
    return output.reverse().join('');
  }
}

