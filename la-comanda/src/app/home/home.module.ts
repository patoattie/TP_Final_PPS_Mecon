import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LoginComponent } from '../componentes/login/login.component';
//import { CabeceraComponent } from "../componentes/cabecera/cabecera.component";

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    LoginComponent,
    //CabeceraComponent,
    HomePage
  ]
})
export class HomePageModule {}
