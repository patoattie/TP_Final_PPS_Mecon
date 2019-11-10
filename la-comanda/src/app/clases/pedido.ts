import { Producto } from './producto';

export class Pedido {
    producto:Producto;
    cantidad:number;

    constructor(){
        this.producto={nombre:"",URL:[],descripcion:"",motivo_baja:"",precio:0,tiempo_elaboracion:"",tiempo_elaboracion_real:""}
    }
}
