import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer, observable } from 'rxjs';
import { TimelineMax } from 'gsap';

//declare var TimelineMax: any;



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true; //without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {    

    });


  }




}

