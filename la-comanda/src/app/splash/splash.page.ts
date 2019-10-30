import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer, observable } from 'rxjs';
import { TimelineMax } from 'gsap';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  showSplash = true; //without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
  
  tl = new TimelineMax({ repeat: 0 });
  t2 = new TimelineMax({ repeat: 0 });

  constructor(private platform: Platform,
  private splashScreen: SplashScreen,
  private statusBar: StatusBar, private router: Router,  
  private screenOrientation: ScreenOrientation
) {
  
}

  ngOnInit() {

    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('lock');
      });
    } catch (e) {
      console.warn('No cordova.js');
    }


    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(8000).subscribe(() => this.showSplash = false);

    });

    setTimeout(() => {    //<<<---    using ()=> syntax
      
     
        this.tl.to('#mozo', 2, { delay: 1, attr: { viewBox: "0 0 500 130" } });
        this.t2.to('#logo', 2, { delay: 1, attr: { viewBox: "0 0 360 62" } });
        this.t2.to('#integrantes', 2, { delay: 1, attr: { viewBox: "0 0 200 83" } });
      
    }, 1000);

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.router.navigateByUrl("/alta-productos");   
    
  }, 8000);



  }


  





}

