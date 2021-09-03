import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatCivilPageRoutingModule } from './etat-civil-routing.module';

import { EtatCivilPage } from './etat-civil.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EtatCivilPageRoutingModule
  ],
  declarations: [EtatCivilPage]
})
export class EtatCivilPageModule {}
