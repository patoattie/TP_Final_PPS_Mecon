import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'principal'
})
export class PrincipalPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
