import { Pipe, PipeTransform } from "@angular/core";

type StrNum = string | number;
type     CF = 'c' | 'f';

@Pipe({ name: 'temperature' }) // adds typing for transform()
export class TemperaturePipe implements PipeTransform {
  private symbol = { c: '℃', f: '℉' };

  private c2f(celsius: StrNum) {
    return (+celsius * 9 / 5 + 32).toFixed(2) + this.symbol.f; // c * 1.8 -32
  }

  private f2c(fahrenheit: StrNum) {
    return ((+fahrenheit - 32) / 9 * 5).toFixed(2) + this.symbol.c; // (f - 32) / 1.8
  }

  private addSymbol(value: StrNum, input: CF) {
    return (+value).toFixed(2) + this.symbol[input];
  }
  // accepts a 1st arg and an additional any amount of args
  // transform(value: any, ...args: any[]) { // Required in @Pipe
  transform(value: StrNum, input: CF, output?: CF) {
    if (!output   ||   input === output) return this.addSymbol(value, input);
    if (input === 'c' && output === 'f') return this.c2f(value);
    if (input === 'f' && output === 'c') return this.f2c(value);
    return value;
  }
}
