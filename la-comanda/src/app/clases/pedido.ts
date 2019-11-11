import { Producto } from './producto';

export class Pedido {
    producto:Producto[];
    estado:string;

    constructor(){
        this.producto=[];
        
        this.estado="";
    }
}
