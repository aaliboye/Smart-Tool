import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymptomesPageRoutingModule } from './symptomes-routing.module';

import { SymptomesPage } from './symptomes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SymptomesPageRoutingModule
  ],
  declarations: [SymptomesPage]
})
export class SymptomesPageModule {}
