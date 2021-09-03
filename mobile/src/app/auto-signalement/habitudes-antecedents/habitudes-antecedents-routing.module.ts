import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitudesAntecedentsPage } from './habitudes-antecedents.page';

const routes: Routes = [
  {
    path: '',
    component: HabitudesAntecedentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitudesAntecedentsPageRoutingModule {}
