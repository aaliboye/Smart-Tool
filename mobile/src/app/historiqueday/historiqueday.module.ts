import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquedayPageRoutingModule } from './historiqueday-routing.module';

import { HistoriquedayPage } from './historiqueday.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquedayPageRoutingModule
  ],
  declarations: [HistoriquedayPage]
})
export class HistoriquedayPageModule {}
