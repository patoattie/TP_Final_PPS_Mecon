import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { SplashPageModule } from './splash/splash.module';
//import { AltaPageModule } from './alta/alta.module';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  //{ path: 'splash', component: SplashPageModule },
  { path: 'alta', loadChildren: './alta/alta.module#AltaPageModule' },
  //{ path: 'alta', component: AltaPageModule },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
