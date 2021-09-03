import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_URL, OAUTH_ISSUER} from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

const TOKEN_KEY = 'u_token_daancovid19';
const ID_USER = null;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uToken = {
    token: '',
    createdAt: '',
  };
  idUser;
  authState = new BehaviorSubject(false);
  constructor(
      private http: HttpClient,
      public storage: Storage,
      private platform: Platform,
      private router: Router,
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    if (localStorage.getItem('token') != null) {
      localStorage.setItem('log', 'true');
      this.authState.next(true);
      console.log(localStorage.getItem('token'));
      this.refreshToken();
      console.log(localStorage.getItem('token'));
    }

    // this.storage.get(TOKEN_KEY).then((response) => {
    //   if (response) {
    //     this.authState.next(true);
    //     console.log(this.uToken = response);
    //   }
    // });
  }

  saveToken(utoken) {
    // this.storage.set(TOKEN_KEY, utoken);
    localStorage.setItem('token', utoken.token);
    this.uToken = utoken;
  }

  saveIdUser(IdUser) {
    // this.storage.set('ID_USER', IdUser);
    localStorage.setItem('ID_USER', IdUser);
    this.idUser = IdUser;
  }

  getIdUser() {
    // return this.storage.get('ID_USER');
    return localStorage.getItem('ID_USER');

  }

  logout() {
    localStorage.setItem('log', 'false');
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigate(['/']);
    });
  }
  isAuthenticated() {
    return this.authState.value;
  }

  getToken() {
    // return this.uToken.token;
    return localStorage.getItem('token');
  }

  register(payload) {
    return this.http.post(`${API_URL}/user`, payload, {
      headers: new HttpHeaders({ issuer: OAUTH_ISSUER }),
    });
  }

  refreshToken() {
    this.http.get(`${API_URL}/user/refresh_token`).subscribe(
        (res: any) => {
          if (res && res.succes === true) {
            this.saveToken(res.token);
          } else {
            // this.logout();
          }
        },
        (err) => {

          // this.logout();
      //   }
      // },
      // (err) => {
      //   this.logout();
      // },
        },
    );
  }

  validateCode(code) {
    return this.http.post(`${API_URL}/user/verify_code`, { code });
  }
}
