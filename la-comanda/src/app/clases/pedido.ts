import { Producto } from './producto';

export class Pedido {
    producto:Producto[];
    estado:string;
    id:number;
    mesa:number;
    user:string;

    constructor(){
        this.producto=[];
        this.id=0;
        this.mesa=0;
        this.estado="";
        this.user="";
    }
}
