import { Component, OnInit } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {
  nuevoUsuario: { nombre: string; clave: string; email:string};

  constructor(private screenOrientation: ScreenOrientation) {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('lock');
      });
    } catch (e) {
      console.warn('No cordova.js');
    }
    this.nuevoUsuario = {nombre:"nombre", clave:"123456", email:"123456"};
   }

  public archivo: File;
  files: File[] = [];

  ngOnInit() {
  }



	onSelect($event) {
		console.log($event);
		this.files.push(...$event.addedFiles);
    this.archivo = this.files[0];
	}

	onRemove($event) {
		console.log($event);
		this.files.splice(this.files.indexOf($event), 1);
  }
}
