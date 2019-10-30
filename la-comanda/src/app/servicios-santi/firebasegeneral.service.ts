import { Injectable } from '@angular/core';
import { FotoService } from './firebase/foto-service.service';
import { Producto } from '../clases/producto';
//import { File } from "@ionic-native/file/ngx";


@Injectable({
  providedIn: 'root'
})
export class FirebasegeneralService {

  constructor(private filestorage:FotoService) { 


  }

  async altaProducto(Producto:Producto, Files:File[]){
    
      this.filestorage.subir(Files,Producto)
      .then(()=>console.log(Producto));
      
   
  
  }

}
