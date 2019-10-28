import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage
{
  spinner=true;
  usuario: {nombre:string, clave:string};

  constructor(private screenOrientation: ScreenOrientation)
  {
    /*try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('lock');
      });
    } catch (e) {
      console.log('No cordova.js');
    }*/

    this.loading();
    this.usuario = {nombre:"nombre", clave:"123456"};
  }

  loading(){

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.spinner=false;
    
  }, 5000);

  }
}
