import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoSignalementPageRoutingModule } from './auto-signalement-routing.module';

import { AutoSignalementPage } from './auto-signalement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoSignalementPageRoutingModule
  ],
  declarations: [AutoSignalementPage]
})
export class AutoSignalementPageModule {}
