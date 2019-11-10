import { Component, OnInit, Input } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Producto } from '../clases/producto';
import { Camera,CameraOptions } from "@ionic-native/camera/ngx";
import { File, DirectoryEntry } from '@ionic-native/file/ngx';
import { FirebasegeneralService } from '../servicios-santi/firebasegeneral.service';
import {BarcodeScanner  } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-alta-productos',
  templateUrl: './alta-productos.page.html',
  styleUrls: ['./alta-productos.page.scss'],
})
export class AltaProductosPage implements OnInit {
  
  @Input() nuevoProducto:Producto;
  
  public archivo: File;
  files: any[] = [];
  modificarBorrar:boolean;

  constructor(private screenOrientation: ScreenOrientation,
              private _camera:Camera,
              private file:File,
              private servicioFirebase:FirebasegeneralService,
              private barcodeScanner:BarcodeScanner)
  {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('lock');
      });
    } catch (e) {
      console.warn('No cordova.js');
    }
    if(!this.nuevoProducto){
    this.nuevoProducto={descripcion:"",nombre:"",tiempo_elaboracion:"",tiempo_elaboracion_real:"",precio:0,URL:[],motivo_baja:""};
    this.modificarBorrar=false;
    }

  }

  ngOnInit() {
  }



	onSelect($event) {
		console.log($event);
		this.files.push(...$event.addedFiles);
    this.archivo = this.files[0];
    console.log(this.files);
	}

	onRemove($event) {
		console.log($event);
		this.files.splice(this.files.indexOf($event), 1);
  }
  alta(){
    this.nuevoProducto.tiempo_elaboracion_real=this.nuevoProducto.tiempo_elaboracion.substring(11,16);
    console.log(this.nuevoProducto.tiempo_elaboracion);

    this.servicioFirebase.altaProducto(this.nuevoProducto,this.files);

  }
 
 
 
 
  async selectImageSource(){
    
    const cameraOptions:CameraOptions={
      quality:100,
      targetHeight:800,
      targetWidth:800,
      destinationType:this._camera.DestinationType.FILE_URI,
      encodingType:this._camera.EncodingType.JPEG,
      mediaType:this._camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType:this._camera.PictureSourceType.CAMERA
    };   
    const directory:DirectoryEntry= await this.file.resolveDirectoryUrl(this.file.dataDirectory);
    this._camera.getPicture(cameraOptions)
      .then((imagedata)=>{
        
        console.log(imagedata);
        const tempFilename = imagedata.substr(imagedata.lastIndexOf('/') + 1);
        const tempBaseFilesystemPath = imagedata.substr(0, imagedata.lastIndexOf('/') + 1);

        const newBaseFilesystemPath = this.file.dataDirectory;
        
        this.file.copyFile(tempBaseFilesystemPath, tempFilename, 
        newBaseFilesystemPath, tempFilename).then(()=>
          this.file.getFile(directory, tempFilename,{create:false})
          .then((File)=>{
              console.log(File);
                var jsFileObject;
                File.file(function (file){ 
                   jsFileObject = file;
                   console.log(jsFileObject);
                });
                setTimeout(()=>this.files.push(jsFileObject),1000);
              }));
        
              console.log(imagedata);
            });

  }



  escan(){
   this.barcodeScanner.scan({
    showFlipCameraButton : true, // iOS and Android
    showTorchButton : true, // iOS and Android
    prompt : "Escanee codigo qr", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
        }
       ).then((result)=> {
        console.log(result.text);
        let parseado:Producto=JSON.parse(result.text);
        
        this.nuevoProducto=parseado;
      });
  }

  countChange(producto){
    console.log("entra aca?");
    console.log(producto);
    this.nuevoProducto=producto;
  }
}
