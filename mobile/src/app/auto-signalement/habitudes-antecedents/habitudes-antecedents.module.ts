import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitudesAntecedentsPageRoutingModule } from './habitudes-antecedents-routing.module';

import { HabitudesAntecedentsPage } from './habitudes-antecedents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitudesAntecedentsPageRoutingModule
  ],
  declarations: [HabitudesAntecedentsPage]
})
export class HabitudesAntecedentsPageModule {}
