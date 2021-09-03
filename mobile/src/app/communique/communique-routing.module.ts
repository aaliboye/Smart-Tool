import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommuniquePage } from './communique.page';

const routes: Routes = [
  {
    path: '',
    component: CommuniquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommuniquePageRoutingModule {}
