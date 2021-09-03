import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JardinListPage } from './jardin-list.page';

const routes: Routes = [
  {
    path: '',
    component: JardinListPage
  },
  {
    path: 'barrier-gesture',
    loadChildren: () => import('./barrier-gesture/barrier-gesture.module').then( m => m.BarrierGesturePageModule)
  },  {
    path: 'jardin',
    loadChildren: () => import('./jardin/jardin.module').then( m => m.JardinPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JardinListPageRoutingModule {}
