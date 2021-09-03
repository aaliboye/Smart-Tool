import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class ActivationGpsService {

    constructor(
        public http: HttpClient,
        public geolocation: Geolocation,
        public androidPermissions: AndroidPermissions,
        public locationAccuracy: LocationAccuracy,
        public router: Router,
    ) {}

    // Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          //  If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          //  If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
        // this.router.navigateByUrl('/welcome');
      } else {
        //  Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
                // this.router.navigateByUrl('/welcome');
              //  Show alert if user click on 'No Thanks'
              // alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        // this.router.navigateByUrl('/welcome');
      },
      error => {
        // alert('Error requesting location permissions ' + JSON.stringify(error));
        // this.router.navigateByUrl('/welcome');
      }
    );
  }
}
