import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APi_URL_PREV, APi_URL_ZONE} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private  httpClient: HttpClient) { }

  listerzone(): Observable<any> {
    return this.httpClient.get(`${APi_URL_ZONE}` ) ;
  }
  listerprevalences(): Observable<any> {
    return this.httpClient.get(`${APi_URL_PREV}` ) ;
  }
  listerprevalence(id): Observable<any> {
    return this.httpClient.get(`${APi_URL_PREV}/` + id ) ;
  }
}
