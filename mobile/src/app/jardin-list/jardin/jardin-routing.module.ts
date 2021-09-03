import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JardinPage } from './jardin.page';

const routes: Routes = [
  {
    path: '',
    component: JardinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JardinPageRoutingModule {}
