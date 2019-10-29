import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { IonicModule } from '@ionic/angular';

import { AltaPage } from './alta.page';

const routes: Routes = [
  {
    path: '',
    component: AltaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxDropzoneModule
  ],
  declarations: [AltaPage]
})
export class AltaPageModule {}
