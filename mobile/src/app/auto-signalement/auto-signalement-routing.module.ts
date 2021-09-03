import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoSignalementPage } from './auto-signalement.page';

const routes: Routes = [
  {
    path: '',
    component: AutoSignalementPage
  },  {
    path: 'etat-civil',
    loadChildren: () => import('./etat-civil/etat-civil.module').then( m => m.EtatCivilPageModule)
  },
  {
    path: 'symptomes',
    loadChildren: () => import('./symptomes/symptomes.module').then( m => m.SymptomesPageModule)
  },
  {
    path: 'habitudes-antecedents',
    loadChildren: () => import('./habitudes-antecedents/habitudes-antecedents.module').then( m => m.HabitudesAntecedentsPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoSignalementPageRoutingModule {}
