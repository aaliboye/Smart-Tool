import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './providers/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  {
    path: 'validation-phone',
    loadChildren: () => import('./validation-phone/validation-phone.module').then( m => m.ValidationPhonePageModule)
  },
  {
    path: 'auto-signalement',
    loadChildren: () => import('./auto-signalement/auto-signalement.module').then( m => m.AutoSignalementPageModule)
  },
  {
    path: 'etat-civil',
    loadChildren: () => import('./auto-signalement/etat-civil/etat-civil.module').then( m => m.EtatCivilPageModule)
  },
  {
    path: 'habitudes-antecedents',
    loadChildren: () => import('./auto-signalement/habitudes-antecedents/habitudes-antecedents.module')
    .then( m => m.HabitudesAntecedentsPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./auto-signalement/confirmation/confirmation.module')
    .then( m => m.ConfirmationPageModule)
  },
  {
    path: 'symptomes',
    loadChildren: () => import('./auto-signalement/symptomes/symptomes.module')
    .then( m => m.SymptomesPageModule)
  },
  {
    path: 'jardin-list',
    loadChildren: () => import('./jardin-list/jardin-list.module').then( m => m.JardinListPageModule)
  },

  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    // canActivate: [ AuthGuard ],
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },

  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'gest-histo',
    loadChildren: () => import('./gest-histo/gest-histo.module').then( m => m.GestHistoPageModule)
  },
  {
    path: 'communique/:id',
    loadChildren: () => import('./communique/communique.module').then( m => m.CommuniquePageModule)
  },
  {
    path: 'historiqueday',
    loadChildren: () => import('./historiqueday/historiqueday.module').then( m => m.HistoriquedayPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
