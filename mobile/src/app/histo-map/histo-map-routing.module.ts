import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoMapPage } from './histo-map.page';

const routes: Routes = [
  {
    path: '',
    component: HistoMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoMapPageRoutingModule {}
