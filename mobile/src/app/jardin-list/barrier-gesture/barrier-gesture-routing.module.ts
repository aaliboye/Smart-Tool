import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarrierGesturePage } from './barrier-gesture.page';

const routes: Routes = [
  {
    path: '',
    component: BarrierGesturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarrierGesturePageRoutingModule {}
