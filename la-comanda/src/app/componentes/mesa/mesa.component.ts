import { Component, OnInit } from '@angular/core';
import { MesaService } from 'src/app/servicios/mesa.service';
import { Mesa } from 'src/app/clases/mesa';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss'],
})
export class MesaComponent implements OnInit {
  mesa: Mesa = new Mesa();
  public Archivofoto: any;
  ok: boolean = true;
  parse: any;
  mesas: Mesa[];
  mensaje: string = " ";

  constructor(public mesaServicio: MesaService, private camera: Camera, private file: File, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {

   this.mesaServicio.traerTodasMesas()
      .subscribe(mesas => {
        this.mesas = mesas;
       // console.log(this.mesas[0].numero);
      });


   /*  this.mesaServicio.traerUnaMesa('mesa_3').subscribe(mesa => {
       console.log(mesa.numero);
    });
    */

    this.traerMesa();
  

      
  }




  altaMesa() {

    let mesas: Mesa[];

    if (this.mesas.some(mesa => mesa.numero == this.mesa.numero)) {
      this.mensaje = "la mesa ya existe";
      console.log('la mesa ya existe');
    } else {
      //if si no esta primero traertodos 
      if (this.Archivofoto.fileName != undefined) {
        console.info(this.Archivofoto);
        this.mesaServicio.altaMesa(this.Archivofoto.fileName, this.Archivofoto.imgBlob, this.mesa);
        this.mensaje = ("mesa cargada");
      }
      else {
        this.mensaje = ("imagen no cargada");
      }
    }


  }



  traerMesas() {

    let mesas: any[];

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.mesaServicio.traerUnaMesa('mesa_2');


    }, 5000);

  }

  cameraCallback(imageData) {
    let image: any = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
  }


  async tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 800,
      targetWidth: 600,
      correctOrientation: true,
    };
    try {
      let fotoInfo = await this.camera.getPicture(options);
      this.Archivofoto = await this.formatoBlob(fotoInfo);
      alert(this.Archivofoto.fileName);
    } catch (error) {
      alert("error.message");
      this.ok = false;
    }
  }


  formatoBlob(fotoInfo) {
    return new Promise((resolve, reject) => {
      let fileName: string;
      this.file.resolveLocalFilesystemUrl(fotoInfo)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;
          fileName = name;
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          return this.file.readAsArrayBuffer(path, fileName);
        })
        .then(buffer => {
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg",
          });
          resolve({ fileName, imgBlob });
        }).catch(e => reject(e));
    });
  }



  scanQr() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.parse = JSON.parse(barcodeData.text);
      this.mesa.numero = this.parse.numero;
      this.mesa.comensales = this.parse.comensales;
      this.mesa.tipo_comensales = this.parse.tipo_comensales;


    }).catch(err => {
      console.log('Error caraga credito', err);
    });
  }


  bajarMesas() {
    let mesas: Mesa[];
    return new Promise((resolve, reject) => {
      resolve(this.mesaServicio.traerTodasMesas()
        .subscribe(user => {

          user.forEach(userData => {
            let mesa = userData.payload.doc.data() as Mesa;
            let id = userData.payload.doc.id;
            mesas.push(mesa);
          });
        }));

    });

  }


  bajaMesa() {
    console.log('mod');
    this.mesa.baja = true;
    this.mesaServicio.bajaMesa(this.mesa);
  }

  
  modificarMesa() {
    this.mesaServicio.modificarMesa(this.mesa);
  }


  traerMesa(){
    this.mesa.numero=3;
    let uid:string= 'mesa'+this.mesa.numero;
    this.mesaServicio.traerUnaMesa(uid).subscribe(mesa => {
      console.log(mesa.numero);
   });
 
  }

  


}
