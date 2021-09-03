import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtatCivilPage } from './etat-civil.page';

const routes: Routes = [
  {
    path: '',
    component: EtatCivilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtatCivilPageRoutingModule {}
