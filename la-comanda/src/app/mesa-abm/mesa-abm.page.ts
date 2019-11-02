import { Component, OnInit } from '@angular/core';
import { Mesa } from 'src/app/clases/mesa';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Vibration } from '@ionic-native/vibration/ngx';
import { MesaService } from '../servicios-mecha/mesa.service';


@Component({
  selector: 'app-mesa-abm',
  templateUrl: './mesa-abm.page.html',
  styleUrls: ['./mesa-abm.page.scss'],
})
export class MesaAbmPage implements OnInit {
  modificacion: boolean;

  mesa: Mesa = new Mesa();
  public Archivofoto:any;
  ok: boolean = true;
  parse: any;
  mesas: Mesa[];
  mensaje: string = " ";
  image: any;
  mifoto: any;
  boton: HTMLElement;
  menu_b: boolean = true;
  alta: boolean = true;
  baja: boolean;
  prueba:boolean;
 


  constructor(private vibration: Vibration, public mesaServicio: MesaService, private camera: Camera, private file: File, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    
    this.traerTodasMesas();
    /*  this.mesaServicio.traerUnaMesa('mesa_3').subscribe(mesa => {
        console.log(mesa.numero);
     });
     */
   // this.traerMesa(3);
  }


  traerTodasMesas(){
  this.mesaServicio.traerTodasMesas()
  .subscribe(mesas => {
    this.mesas = mesas;
    // console.log(this.mesas[0].numero);
  });
}


  altaMesa() {
    this.mensaje = " ";
     this.estAnim('alta', 'animation-target'); 
    if (this.mesas.some(mesa => mesa.numero == this.mesa.numero)) {
      this.mensaje = "la mesa ya existe";
      this.vibration.vibrate(1000);
      console.log('la mesa ya existe');
    } else if (this.mesa.numero == undefined) {
      this.mensaje = "Ingrese una la mesa válida";
      this.vibration.vibrate(1000);
      console.log('la mesa ya existe');
    }else {
      //if si no esta primero traertodos 
      if (this.Archivofoto != undefined) {
        console.info(this.Archivofoto);
        this.mesaServicio.altaMesa(this.Archivofoto.fileName, this.Archivofoto.imgBlob, this.mesa);
        this.mensaje = ("mesa cargada");
        this.traerTodasMesas();
        this.mesa = new Mesa();
      }
      else {
        this.mensaje = ("imagen no cargada");
        this.vibration.vibrate(1000);
      }
    }
  }

vibrar(){
  this.vibration.vibrate(1000);
}


  cameraCallback(imageData) {
    this.image = document.getElementById('myImage');
    this.image.src = "data:image/jpeg;base64," + imageData;
    console.log(imageData);
  }


  async tomarFoto() {
    const options: CameraOptions = {
      quality: 50,
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
      let filename = fotoInfo.substring(fotoInfo.lastIndexOf('/') + 1);
      let path = fotoInfo.substring(0, fotoInfo.lastIndexOf('/') + 1);
      //then use the method reasDataURL  btw. var_picture is ur image variable
      this.file.readAsDataURL(path, filename).then(res => this.mifoto = res);

    } catch (error) {
      console.log("error.message");
      this.vibration.vibrate(1000);
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
      this.mensaje = 'Error carga código Qr';
      this.vibration.vibrate(1000);
    });
  }



  bajaMesa() {
    this.mensaje = " ";
    this.estAnim('baja', 'animation-target');
    if (this.mesas.some(mesa => mesa.numero == this.mesa.numero)) {
      this.mesa.baja = true;
      this.mesaServicio.bajaMesa(this.mesa); 
      this.mensaje = ("Se dió de baja la mesa nro " + this.mesa.numero.toString());
      this.traerTodasMesas();
    } else {
      this.mensaje = ("No se encontró la mesa indicada");
      this.vibration.vibrate(1000);
    }
    this.mesa = new Mesa();
    }
  


  estAnim(elementId, animClasses) {
    document.getElementById(elementId).classList.add(animClasses);
    var wait = window.setTimeout(function () {
      document.getElementById(elementId).classList.remove(animClasses)
    },
      1300
    );
  }

  modificarMesa() {
    this.mensaje = " ";
    this.estAnim('modificar', 'animation-target');
    if (this.mesas.some(mesa => mesa.numero == this.mesa.numero)) {
      this.mesaServicio.modificarMesa(this.mesa);
      this.mensaje = ("Se modificó la mesa nro " + this.mesa.numero.toString());
      this.traerTodasMesas();
    } else {
      this.mensaje = ("No se encontró la mesa indicada");
      this.vibration.vibrate(1000);
    
    }
    this.mesa = new Mesa();
   
  }


  traerMesa(numero: number) {
    let uid: string = 'mesa_' + numero.toString();
    this.mesaServicio.traerUnaMesa(uid).subscribe(mesa => {
     this.mesa = mesa;

  
    });
   
  }

  menu(accion: string) {
    switch (accion) {
      case 'alta':
        this.alta = true;
        this.baja = false;
        this.modificacion = false;
        this.mensaje=" ";
        break;
      case 'baja':
        this.baja = true;
        this.alta = false;
        this.modificacion = false;
        this.mensaje=" ";
        break;
      case 'modificacion':
        this.modificacion = true;
        this.baja = false;
        this.alta = false;
        this.mensaje=" ";
        break;
    }
  }


}
