import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MesaComponent } from './componentes/mesa/mesa.component';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'mesa', component: MesaComponent },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'alta', loadChildren: './alta/alta.module#AltaPageModule' },
  { path: 'principal', loadChildren: './principal/principal.module#PrincipalPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
