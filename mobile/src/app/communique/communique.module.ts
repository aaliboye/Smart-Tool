import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommuniquePageRoutingModule } from './communique-routing.module';

import { CommuniquePage } from './communique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommuniquePageRoutingModule
  ],
  declarations: [CommuniquePage]
})
export class CommuniquePageModule {}
