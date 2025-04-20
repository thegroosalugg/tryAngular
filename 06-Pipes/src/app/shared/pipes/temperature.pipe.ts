import { Pipe, PipeTransform } from "@angular/core";

type StrNum = string | number;
type     CF = 'c' | 'f';

@Pipe({ name: 'temperature' }) // adds typing for transform()
export class TemperaturePipe implements PipeTransform {
  private symbol = { c: '℃', f: '℉' };
  private equation = {
    c: (f: StrNum) => (+f - 32) / 9 *  5, // (f -  32) / 1.8
    f: (c: StrNum) =>  +c *  9  / 5 + 32  //  c * 1.8  -  32
  }

  private addSymbol(value: StrNum, input: CF) {
    return (+value).toFixed(2) + this.symbol[input];
  }

  private convert(value: StrNum, output: CF) {
    return this.addSymbol(this.equation[output](value), output)
  }

  // accepts a 1st arg and an additional any amount of args
  // transform(value: any, ...args: any[]) { // Required in @Pipe
  transform(value: StrNum, input: CF, output?: CF) {
    if (!output || input === output) return this.addSymbol(value, input);
    return this.convert(value, output);
  }
}
