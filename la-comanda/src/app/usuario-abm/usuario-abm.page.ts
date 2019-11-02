import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios-mecha/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-usuario-abm',
  templateUrl: './usuario-abm.page.html',
  styleUrls: ['./usuario-abm.page.scss'],
})
export class UsuarioAbmPage implements OnInit {
  modificacion: boolean;

  usuario: Usuario = new Usuario();
  public Archivofoto:any;
  ok: boolean = true;
  parse: any;
  usuarios: Usuario[];
  mensaje: string = " ";
  image: any;
  mifoto: any;
  boton: HTMLElement;
  menu_b: boolean = true;
  alta: boolean = true;
  baja: boolean;
  prueba:boolean;
 


  constructor(private vibration: Vibration, public usuarioServicio: UsuarioService, private camera: Camera, private file: File, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    
    this.traerTodasUsuarios();
    /*  this.usuarioServicio.traerUnaUsuario('usuario_3').subscribe(usuario => {
        console.log(usuario.numero);
     });
     */
   // this.traerUsuario(3);
  }


  traerTodasUsuarios(){
  this.usuarioServicio.traerTodasUsuarios()
  .subscribe(usuarios => {
    this.usuarios = usuarios;
    // console.log(this.usuarios[0].numero);
  });
}


  altaUsuario() {
    this.mensaje = " ";
     this.estAnim('alta', 'animation-target'); 
    if (this.usuarios.some(usuario => usuario.dni == this.usuario.dni)) {
      this.mensaje = "la usuario ya existe";
      this.vibration.vibrate(1000);
      console.log('la usuario ya existe');
    } else if (this.usuario.dni == undefined) {
      this.mensaje = "Ingrese una la usuario válida";
      this.vibration.vibrate(1000);
      console.log('la usuario ya existe');
    }else {
      //if si no esta primero traertodos 
      // La foto se tomará del celular. La foto puede ser tomada luego de realizar el alta
      if (this.Archivofoto != undefined) {
        console.info(this.Archivofoto);
        this.usuarioServicio.altaUsuario(this.Archivofoto.fileName, this.Archivofoto.imgBlob, this.usuario);
        this.mensaje = ("usuario cargada");
        this.traerTodasUsuarios();
        this.usuario = new Usuario();
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



 


  bajaUsuario() {
    this.mensaje = " ";
    this.estAnim('baja', 'animation-target');
    if (this.usuarios.some(usuario => usuario.dni == this.usuario.dni)) {
      this.usuario.baja = true;
      this.usuarioServicio.bajaUsuario(this.usuario); 
      this.mensaje = ("Se dió de baja la usuario nro " + this.usuario.dni.toString());
      this.traerTodasUsuarios();
    } else {
      this.mensaje = ("No se encontró la usuario indicada");
      this.vibration.vibrate(1000);
    }
    this.usuario = new Usuario();
    }
  
  scanQrDNI() {
   const config = {     
      formats : "PDF_417" // default: all but PDF_417 and RSS_EXPANDED    
  }
  
    this.barcodeScanner.scan(config).then(result => {
      setTimeout(() => {    //<<<---    using ()=> syntax
       // alert("We got a barcode\n" +
      //  "Result: " + result.text + "\n" +
      //  "Format: " + result.format + "\n" +
       // "Cancelled: " + result.cancelled);

        //string.split([separator][, limit]);
       let resultado = result.text.split('@', 6);
        //me interes 1, 2 y 4
       this.usuario.nombre = resultado[1];
       this.usuario.apellido = resultado[2];
       this.usuario.dni = resultado[4];
		      
    }, 1000);
      
      
    }).catch(err => {
      this.mensaje = 'Error carga código Qr' + err;
      this.vibration.vibrate(1000);
    });
  }


  estAnim(elementId, animClasses) {
    document.getElementById(elementId).classList.add(animClasses);
    var wait = window.setTimeout(function () {
      document.getElementById(elementId).classList.remove(animClasses)
    },
      1300
    );
  }

  modificarUsuario() {
    this.mensaje = " ";
    this.estAnim('modificar', 'animation-target');
    if (this.usuarios.some(usuario => usuario.dni == this.usuario.dni)) {
      this.usuarioServicio.modificarUsuario(this.usuario);
      this.mensaje = ("Se modificó la usuario nro " + this.usuario.dni.toString());
      this.traerTodasUsuarios();
    } else {
      this.mensaje = ("No se encontró la usuario indicada");
      this.vibration.vibrate(1000);
    
    }
    this.usuario = new Usuario();
   
  }


  traerUsuario(numero: number) {
    let uid: string = 'usuario_' + numero.toString();
    this.usuarioServicio.traerUnaUsuario(uid).subscribe(usuario => {
     this.usuario = usuario;

  
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
