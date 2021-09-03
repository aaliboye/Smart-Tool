import { Injectable, NgZone } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {API_URL} from 'src/environments/environment';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents,
} from '@ionic-native/background-geolocation/ngx';
import { Platform, AlertController } from '@ionic/angular';
import {catchError, retry} from 'rxjs/operators';
import {Userid} from '../model/userid';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public logs: string[] = [];
  public watch: any;
  public lat = 0;
  public lng = 0;

  $position = new Subject();
  imei = '';
  // tslint:disable-next-line:variable-name
  gps_update_link = `${API_URL}/location`;
  constructor(
    public zone: NgZone,
    private http: HttpClient,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
    private platform: Platform,
    private alertCtrl: AlertController,
  ) {
    this.backgroundGeolocation
      .on(BackgroundGeolocationEvents.foreground)
      .subscribe(() => {
        // Foreground Tracking
        setInterval(() => {
          this.geolocation
            .getCurrentPosition()
            .then((position: Geoposition) => {
              const timestamp = new Date().getTime();
              const payload = {
                position: {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                },
                imei: this.imei,
                timestamp,
                status: '',
              };
              this.http
                .post(`${API_URL}/location`, payload)
                .subscribe(value => {
                    localStorage.setItem('place', value['zoneslist']['idZone']);});
            })
            .catch((err) => {
              console.log('unable to access location', err);
            });
        }, 1000 * 60 * 5);
      });
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
        'Something bad happened; please try again later.');
  };

  startBackgroundGeolocation() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 1,
      distanceFilter: 5,
        startOnBoot : true,
      debug: false,
        notificationTitle : 'Daan covid19',
        notificationText : 'Mbolo moy dolé',
        stopOnTerminate: false,
      notificationIconLarge : 'ic_stat_onesignal_default',
      notificationIconSmall : 'ic_stat_onesignal_default',
      notificationIconColor : '#04baba'
    };

    if (this.platform.is('ios')) {
      config.locationProvider = 0;
      config.pauseLocationUpdates = true;
    }

    if (this.platform.is('android')) {
      config.locationProvider = 1;
      config.startForeground = false;
      config.interval = 1000 * 60 * 5 ;
      config.fastestInterval = 5000;
      config.activitiesInterval = 5000;
    }
    this.backgroundGeolocation.configure(config).then(
      () => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
          .subscribe((location: BackgroundGeolocationResponse) => {
            console.log(location);
            console.log(
              'BackgroundGeolocation:  ' +
                location.latitude +
                ',' +
                location.longitude,
            );
            const timestamp = new Date().getTime();
            const payload = {
              position: {
                lat: location.latitude,
                lon: location.longitude,
              },
              imei: this.imei,
              timestamp,
              status: '',
            };
            this.http
              .post(`${API_URL}/location`, payload)
                .subscribe(value => {
                    localStorage.setItem('place', value['zoneslist']['idZone']); });
            //  Run update inside of Angular's zone
            this.zone.run(() => {
              this.lat = location.latitude;
              this.lng = location.longitude;
              this.logs.push(`${location.latitude},${location.longitude}`);
            });
            if (this.platform.is('ios')) {
              this.backgroundGeolocation.finish(); // FOR IOS ONLY
            }
          });
      },
      (err) => {
        console.log('Background location error', err);
      },
    );
    this.backgroundGeolocation.start();
  }

  // Comprueba si la detección de posición está habilitada en el dispositivo. En caso contrario lanza la opción nativa para habilitarla.
  startTracking() {
    this.platform.ready().then((readySource) => {
      // Platform now ready, execute any required native code.
      if (readySource === 'cordova') {
        this.backgroundGeolocation.isLocationEnabled().then((rta) => {
          if (rta) {
            this.startBackgroundGeolocation();
          } else {
            this.backgroundGeolocation.showLocationSettings();
          }
        });
      } else if (readySource === 'dom') {
      }
    });
  }

  stopTracking() {
    this.platform.ready().then((readySource) => {
      if (readySource === 'cordova') {
        this.backgroundGeolocation.stop();
      } else if (readySource === 'dom') {
      }
    });
  }
  // notificationid(playerId) {
    // return this.http.post(`${API_URL}/push-notification/add-player-id`, playerId);
  // }
  notificationid(playerId): Observable<Userid> {
    return this.http
        .post<Userid>(`${API_URL}/push-notification/add-player-id`, playerId, this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
  }

}
