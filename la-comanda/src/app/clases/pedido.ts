import { Producto } from './producto';

export class Pedido {
    producto:Producto[];
    estado:string;
    id:number;
    constructor(){
        this.producto=[];
        
        this.estado="";
    }
}
