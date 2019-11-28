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
import { File } from "@ionic-native/file/ngx";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalProductoPage } from './modal-producto/modal-producto.page';
import { ModalProductoPageModule } from './modal-producto/modal-producto.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ModalListadoProductosPedidoPipe } from './modal-listado-productos-pedido.pipe';
import { FCM } from '@ionic-native/fcm/ngx';
import { FbLoginComponent } from './componentes/fb-login/fb-login.component';
import { Facebook } from '@ionic-native/facebook/ngx';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [AppComponent, ModalListadoProductosPedidoPipe, FbLoginComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ModalProductoPageModule,
    CommonModule,
  ],

  providers: [
    Vibration,
    ScreenOrientation,
    StatusBar,
    SplashScreen,
    Camera,
    File,
    BarcodeScanner,
    FCM,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
