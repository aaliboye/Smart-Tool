import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-symptomes',
  templateUrl: './symptomes.page.html',
  styleUrls: ['./symptomes.page.scss',
             '../auto-signalement.page.scss'],
})
export class SymptomesPage implements OnInit {
  public infosSymptomes: any = [];
  public infosEtatCivil: any = [];
  public infosAntecedents: any = [];

  constructor(public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.infosEtatCivil = this.router.getCurrentNavigation().extras.state.infosEtatCivil;
      this.infosSymptomes = this.router.getCurrentNavigation().extras.state.infosSymptomes;
      this.infosAntecedents = this.router.getCurrentNavigation().extras.state.infosAntecedents;
      console.log(this.infosEtatCivil);
      console.log(this.infosSymptomes);
      console.log(this.infosAntecedents);

      this.chargementSymptomes(this.infosSymptomes);
    }
  }

  ngOnInit() {
    return false;
  }

  ionViewDidEnter() {}

  chargementSymptomes(infosSymptomes) {
    for (let i = 1 ; i < infosSymptomes.length ; i++) {
      if ( this.infosSymptomes[i] === 1 ) {
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          $('#choix' + i).attr('checked', true);
        });
      }
    }
  }

  checkSymptomes(event: any, id: any) {
    const choix = event.detail.checked;
    if (choix) { this.infosSymptomes [id] = 1; } else { this.infosSymptomes [id] = ''; }
  }

  gotoAntecedent() {

    const navigationExtras: NavigationExtras = {
      state: { infosEtatCivil: this.infosEtatCivil, infosSymptomes: this.infosSymptomes, infosAntecedents: this.infosAntecedents }
    };
    this.router.navigate(['habitudes-antecedents'], navigationExtras);
  }

  gotoEtatCivil() {
    const navigationExtras: NavigationExtras = {
      state: { infosEtatCivil: this.infosEtatCivil, infosSymptomes: this.infosSymptomes }
    };
    this.router.navigate(['etat-civil'], navigationExtras);
  }

}
