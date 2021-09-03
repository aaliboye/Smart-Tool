import {Component, NgZone} from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';
import { LocationService } from './providers/location.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { CodePush } from '@ionic-native/code-push/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from '@ionic-native/background-geolocation/ngx';
import {Userid} from "./model/userid";

declare var cordova: any;
const TOKEN_KEY = 'u_token_daancovid19';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
playerid: Userid;
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private authService: AuthService,
      private router: Router,
      private locationSvc: LocationService,
      private backgroundMode: BackgroundMode,
      private codePush: CodePush,
      private fcm: FCM,
      private oneSignal: OneSignal,
      private alertCtrl: AlertController,
      private storage: Storage,
      private ngZone: NgZone,
      private backgroundGeolocation: BackgroundGeolocation,

  ) {
    this.initializeApp();
    this.playerid = new Userid();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      cordova.plugins.backgroundMode.setDefaults({ silent: true });
      cordova.plugins.backgroundMode.disableBatteryOptimizations();
      this.backgroundMode.enable();

      // this.authService.authState.subscribe((state) => {
      //   if (state) {
      //     this.router.navigateByUrl('/welcome');
      //   } else {
      //     this.router.navigateByUrl('/home');
      //   }
      // });
      if (localStorage.getItem('log') === 'true') {
        this.router.navigateByUrl('/welcome');

      } else {
        this.router.navigateByUrl('/home');

      }

      this.oneSignalSetupPush();
      this.downloadProgress();

      // get FCM token

      this.fcm.getToken().then(token => {
        console.log(token);
      });

      // ionic push notification example
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('tapped');
          this.router.navigateByUrl('/info');
        } else {
          console.log('nottapped');
        }

      });

      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
    });
  }

  downloadProgress() {
    this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));

    const downloadProgress = (progress) => {
      console.log(
          `Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`,
      );
    };
    this.codePush
        .sync({}, downloadProgress)
        .subscribe((syncStatus) => console.log(syncStatus));
  }
  oneSignalSetupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('3552b3b3-6e98-417e-a5a3-e73b723a6eb6', '655907879563');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    console.log(this.oneSignal.getIds());
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      // const msg = data.payload.body;
      // const title = data.payload.title;
      // const additionalData = data.payload.additionalData;
      this.router.navigate(['/info']);
      console.log(data);
      // this.showAlert(title, msg, additionalData.task);

    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      // const additionalData = data.notification.payload.additionalData;
      this.router.navigate(['/info']);
      console.log(data);
      console.log('tapped');

      // this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {
      console.log('userid' , id.userId);
      this.playerid.playerId = id.userId;
      this.locationSvc.notificationid( this.playerid).subscribe((value) =>{
        console.log(value);
      });
    });
  }

  // async showAlert(title, msg, task) {
  //   const alert = await this.alertCtrl.create({
  //     header: title,
  //     subHeader: msg,
  //     buttons: [
  //       {
  //         text: `Action: ${task}`,
  //         handler: () => {
  //           // E.g: Navigate to a specific screen
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
}
