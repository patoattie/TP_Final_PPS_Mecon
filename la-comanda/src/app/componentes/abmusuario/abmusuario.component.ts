import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class AbmusuarioComponent implements OnInit {
  modificacion: boolean;

  usuario: Usuario = new Usuario();
  public Archivofoto: any;
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
 


  constructor(public UsuarioServicio: UsuarioService, private camera: Camera, private file: File, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {

    this.UsuarioServicio.traerTodasUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        // console.log(this.mesas[0].numero);
      });


    /*  this.UsuarioServicio.traerUnaUsuario('mesa_3').subscribe(usuario => {
        console.log(usuario.numero);
     });
     */

    this.traerUsuario(3);





  }





  altaUsuario() {

    let usuario: Usuario[];

    if (this.usuarios.some(usuario => usuario.dni == this.usuario.dni)) {
      this.mensaje = "la usuario ya existe";
      console.log('la usuario ya existe');
    } else {
      //if si no esta primero traertodos 
      if (this.Archivofoto.fileName != undefined) {
        console.info(this.Archivofoto);
        this.UsuarioServicio.altaUsuario(this.Archivofoto.fileName, this.Archivofoto.imgBlob, this.usuario);
        this.mensaje = ("usuario cargada");
      }
      else {
        this.mensaje = ("imagen no cargada");
      }
    }


  }



  traerUsuarios() {

    let mesas: any[];

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.UsuarioServicio.traerUnaUsuario('mesa_3');


    }, 5000);

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
      this.usuario.dni = this.parse.dni;
      this.usuario.nombre = this.parse.nombre;
      this.usuario.apellido = this.parse.apellido;

    }).catch(err => {
      console.log('Error caraga credito', err);
    });
  }


  bajarUsuarios() {
    let mesas: Usuario[];
    return new Promise((resolve, reject) => {
      resolve(this.UsuarioServicio.traerTodasUsuarios()
        .subscribe(user => {

          user.forEach(userData => {
            let usuario = userData.payload.doc.data() as Usuario;
            let id = userData.payload.doc.id;
            mesas.push(usuario);
          });
        }));

    });

  }


  bajaUsuario() {
    console.log('mod');
    this.usuario.baja = true;
    this.UsuarioServicio.bajaUsuario(this.usuario);
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
    this.estAnim('modificar', 'animation-target');
    this.UsuarioServicio.modificarUsuario(this.usuario);
  }


  traerUsuario(dni: number) {
    let uid: string = 'usuario_' + dni.toString();
    this.UsuarioServicio.traerUnaUsuario(uid).subscribe(usuario => {
      console.log(usuario.dni);
    });

  }

  menu(accion: string) {

    switch (accion) {
      case 'alta':
        this.alta = true;
        this.baja = false;
        this.modificacion = false;
        break;
      case 'baja':
        this.baja = true;
        this.alta = false;
        this.modificacion = false;
        break;
      case 'modificacion':
        this.modificacion = true;
        this.baja = false;
        this.alta = false;
        break;
    }

  }


}
