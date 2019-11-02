import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'alta', loadChildren: './alta/alta.module#AltaPageModule' },
  { path: 'alta-productos', loadChildren: './alta-productos/alta-productos.module#AltaProductosPageModule' },
  { path: 'alta-mesa', loadChildren: './alta-mesa/alta-mesa.module#AltaMesaPageModule' },
  { path: 'mesa-abm', loadChildren: './mesa-abm/mesa-abm.module#MesaAbmPageModule' },
  { path: 'usuario-abm', loadChildren: './usuario-abm/usuario-abm.module#UsuarioAbmPageModule' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
