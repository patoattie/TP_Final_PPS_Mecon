import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuarioAbmPage } from './usuario-abm.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioAbmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuarioAbmPage]
})
export class UsuarioAbmPageModule {}
