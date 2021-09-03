import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './providers/token.interceptor';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { CodePush } from '@ionic-native/code-push/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { IonRefreshNativeModule } from 'ion-refresh-native';
import { Camera } from '@ionic-native/camera/ngx';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = { url: 'https://localhost:8200', options: {} };
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import {CacheModule} from 'ionic-cache';
import {HistoMapPage} from './histo-map/histo-map.page';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import {GestHistoPage} from './gest-histo/gest-histo.page';
import {MaptestComponent} from './maptest/maptest.component';
registerLocaleData(localeFr);


@NgModule({
  declarations: [AppComponent, HistoMapPage, MaptestComponent],
  entryComponents: [HistoMapPage, MaptestComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CacheModule.forRoot(),
    IonicStorageModule.forRoot(),
    FormsModule,
    LeafletModule,
    ReactiveFormsModule,
    IonRefreshNativeModule,
    // SocketIoModule.forRoot(config)

  ],
  providers: [
    StatusBar,
    FCM,
    BackgroundMode,
    BackgroundGeolocation,
    OneSignal,
    CallNumber,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    Geolocation,
    CodePush,
    AndroidPermissions,
    LocationAccuracy,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
