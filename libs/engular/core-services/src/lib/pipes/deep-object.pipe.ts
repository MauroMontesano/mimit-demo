import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deepObject',
})
export class DeepObjectPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const arr = args ? args.split('.') : [];
    let tmp = value;
    while (arr.length && (tmp = tmp[arr.shift()])) {}

    return tmp;
  }
}
