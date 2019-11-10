import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxDropzoneModule, NgxDropzoneComponent } from 'ngx-dropzone';

import { IonicModule } from '@ionic/angular';

import { ModalProductoPage } from './modal-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProductoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDropzoneModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalProductoPage]
})
export class ModalProductoPageModule {}
