import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

declare var $: any;
@Component({
  selector: 'app-habitudes-antecedents',
  templateUrl: './habitudes-antecedents.page.html',
  styleUrls: ['./habitudes-antecedents.page.scss',
              '../auto-signalement.page.scss'],
})
export class HabitudesAntecedentsPage implements OnInit {

  public infosAntecedents: any = [];
  public infosEtatCivil: any = [];
  public infosSymptomes: any = [];
  constructor(
    public router: Router,
    public androidPermissions: AndroidPermissions,
    public locationAccuracy: LocationAccuracy,
    public geolocation: Geolocation,
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.infosEtatCivil = this.router.getCurrentNavigation().extras.state.infosEtatCivil;
      this.infosSymptomes = this.router.getCurrentNavigation().extras.state.infosSymptomes;
      this.infosAntecedents = this.router.getCurrentNavigation().extras.state.infosAntecedents;
      console.log(this.infosEtatCivil);
      console.log(this.infosSymptomes);
      console.log(this.infosAntecedents);
      this.chargementAntecedents(this.infosAntecedents);

    }
  }

  ngOnInit() {}

  chargementAntecedents(infosAntecedents) {
    for (let i = 1 ; i < infosAntecedents.length ; i++) {
      if ( infosAntecedents[i] === 1 ) {
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          $('#choixAnt' + i).attr('checked', true);
        });
      }
    }
  }

  checkAntecedents(event: any, id: any) {
    const choix = event.detail.checked;
    if (choix) { this.infosAntecedents [id] = 1; } else { this.infosAntecedents [id] = ''; }
  }

  sendInformations() {
    this.verifierAutorisationGPS();
  }

  sendData() {
    const navigationExtras: NavigationExtras = {
      state: { infosEtatCivil: this.infosEtatCivil,
               infosSymptomes: this.infosSymptomes,
               infosAntecedents: this.infosAntecedents }
    };
    this.router.navigate(['confirmation'], navigationExtras);
  }

  verifierAutorisationGPS() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => { if (result.hasPermission) { this.askToTurnOnGPS(); } else { this.demanderPermissionGPS(); } },
      err => { alert(err); }
    );
  }

  demanderPermissionGPS() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        this.sendData();
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(() => { this.askToTurnOnGPS(); },
            error => {
              this.sendData();
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => { this.sendData(); },
      error => { this.sendData(); }
    );
  }

  gotoSymptomes() {
    const navigationExtras: NavigationExtras = {
      state: { infosEtatCivil: this.infosEtatCivil, infosSymptomes: this.infosSymptomes, infosAntecedents: this.infosAntecedents,  }
    };
    this.router.navigate(['symptomes'], navigationExtras);
  }
}
