import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AuthService } from './servicios/auth.service';
//import { LoginComponent } from './componentes/login/login.component';
import { HomePageModule } from './home/home.module';
import { SplashPageModule } from './splash/splash.module';
import { CabeceraComponent } from "./componentes/cabecera/cabecera.component";
import { AltaPageModule } from './alta/alta.module';





@NgModule({
  declarations: [
    //LoginComponent,
    CabeceraComponent,
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HomePageModule,
    AltaPageModule,
    SplashPageModule,
    AppRoutingModule
  ],
  providers: [
    ScreenOrientation,   
    StatusBar,
    SplashScreen,  
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
