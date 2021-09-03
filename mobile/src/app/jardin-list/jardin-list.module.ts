import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JardinListPageRoutingModule } from './jardin-list-routing.module';

import { JardinListPage } from './jardin-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JardinListPageRoutingModule
  ],
  declarations: [JardinListPage]
})
export class JardinListPageModule {}
