import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {APi_URL_INFO} from '../../environments/environment';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(public httpClient: HttpClient, public storage: Storage) { }

  getList(): Observable<any> {
    return this.httpClient.get(APi_URL_INFO);
  }
}
