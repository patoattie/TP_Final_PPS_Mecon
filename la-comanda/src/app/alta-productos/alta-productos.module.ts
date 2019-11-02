import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { IonicModule } from '@ionic/angular';

import { AltaProductosPage } from './alta-productos.page';

const routes: Routes = [
  {
    path: '',
    component: AltaProductosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxDropzoneModule
  ],
  declarations: [AltaProductosPage]
})
export class AltaProductosPageModule {}
