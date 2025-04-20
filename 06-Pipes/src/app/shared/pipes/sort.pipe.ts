import { Pipe, PipeTransform } from '@angular/core';

// this pipe is purely demonstational: using it with dynamic value arrays causes index mismatch
@Pipe({
  name: 'sort',
  pure: false // disables caching: values will transform each time a value in array is changed
})            // does not require shallow copies - performance overhead, use sparingly
export class SortPipe implements PipeTransform {
  transform(value: string[] | number[], reverse?: 'reverse') {
    return [...value].sort((a, b) =>
      reverse ? (a > b ? -1 : 1) : a > b ? 1 : -1
    );
  }
}
