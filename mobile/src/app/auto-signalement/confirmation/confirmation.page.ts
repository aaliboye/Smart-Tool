import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AutoSignalementService } from '../auto-signalement-service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss',
              '../auto-signalement.page.scss'],
})
export class ConfirmationPage implements OnInit {
  subscription: any;
  latitude = null;
  longitude = null;

  public donneesCompletesJSON;
  infosEtatCivil: any;
  infosSymptomes: any;
  infosAntecedents: any;
  constructor(
    public platform: Platform,
    public router: Router,
    public androidPermissions: AndroidPermissions,
    public locationAccuracy: LocationAccuracy,
    public autoSignalementService: AutoSignalementService,
    private authService: AuthService,
    public geolocation: Geolocation,
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.infosEtatCivil = this.router.getCurrentNavigation().extras.state.infosEtatCivil;
      this.infosSymptomes = this.router.getCurrentNavigation().extras.state.infosSymptomes;
      this.infosAntecedents = this.router.getCurrentNavigation().extras.state.infosAntecedents;
      console.log(this.infosEtatCivil);
      console.log(this.infosSymptomes);
      console.log(this.infosAntecedents);

      // Envoie des données après récupération des coordonnées géographiques
      this.getGeolocation();
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {});
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  saveData() {

    // this.authService.getIdUser().then((val) => {
    if ( this.authService.getIdUser() != null ) {

      let idSelfReport = null;
      this.infosEtatCivil.lat = this.latitude;
      this.infosEtatCivil.lng = this.longitude;

      // insert to 'SelfReporting'
      this.autoSignalementService.saveToSelfReporting(this.infosEtatCivil).subscribe(value => {
        // tslint:disable-next-line:no-string-literal
        idSelfReport = value['id'];
        console.log(value);

        for (let i = 1 ; i < this.infosSymptomes.length ; i++) {
          if ( this.infosSymptomes[i] === 1 ) {
            // insert to 'SelfReporting-Symptoms' idreport, idsymptom
            const dataSymptoms = { idreport: idSelfReport, idsymptom: i};
            this.autoSignalementService.saveToSelfReportingSymptoms(dataSymptoms).subscribe(value2 => {
            }, (error: any) => { console.dir(error); });

          }
        }

        for (let i = 1 ; i < this.infosAntecedents.length ; i++) {
          if ( this.infosAntecedents[i] === 1 ) {
            // insert to 'SelfReporting-RiskFactors'
            const dataRiskFactors = { idreport: idSelfReport, idrisk: i};
            this.autoSignalementService.saveToSelfReportingRiskFactors(dataRiskFactors).subscribe(value3 => {
            }, (error: any) => { console.dir(error); });

          }
        }

      }, (error: any) => { console.dir(error); });

    // });
    }

  }

  getGeolocation() {
    const options = {timeout: 5000, enableHighAccuracy: false};
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.saveData();
     }).catch((error) => {
        this.saveData();
     });
  }


}
