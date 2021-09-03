import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestHistoPageRoutingModule } from './gest-histo-routing.module';

import { GestHistoPage } from './gest-histo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestHistoPageRoutingModule
  ],
  declarations: [GestHistoPage]
})
export class GestHistoPageModule {}
