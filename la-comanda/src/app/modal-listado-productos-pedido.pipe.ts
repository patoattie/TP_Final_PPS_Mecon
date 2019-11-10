import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalListadoProductosPedido'
})
export class ModalListadoProductosPedidoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
