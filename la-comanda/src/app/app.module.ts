import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from "../environments/environment";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { Camera } from '@ionic-native/camera/ngx';
import {File } from "@ionic-native/file/ngx";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [  BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
     AngularFireAuthModule,
     AngularFirestoreModule,
     AngularFireStorageModule,
     FormsModule,
     BrowserModule,
     ReactiveFormsModule
  ],
  providers: [ 
  	Vibration,
    ScreenOrientation,   
    StatusBar,
    SplashScreen,  
    Camera,
    File,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
