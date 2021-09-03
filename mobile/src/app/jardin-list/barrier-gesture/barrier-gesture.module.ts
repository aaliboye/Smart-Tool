import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarrierGesturePageRoutingModule } from './barrier-gesture-routing.module';

import { BarrierGesturePage } from './barrier-gesture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarrierGesturePageRoutingModule
  ],
  declarations: [BarrierGesturePage]
})
export class BarrierGesturePageModule {}
