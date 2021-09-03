import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestHistoPage } from './gest-histo.page';

const routes: Routes = [
  {
    path: '',
    component: GestHistoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestHistoPageRoutingModule {}
