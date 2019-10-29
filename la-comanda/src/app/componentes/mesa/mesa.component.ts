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

  constructor(public mesaServicio: MesaService, private camera: Camera, private file: File, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() { }

  altaMesa() {
    //if si no esta primero traertodos 
    if (this.Archivofoto.fileName != undefined) {
      console.info(this.Archivofoto);
      this.mesaServicio.altaMesa(this.Archivofoto.fileName, this.Archivofoto.imgBlob, this.mesa);
    }
    else {
      alert("imagen no cargada");
    }

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




}
