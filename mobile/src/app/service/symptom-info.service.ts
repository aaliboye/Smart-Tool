import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {APi_URL_symptoms} from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SymptomInfoService {

  constructor(private http: HttpClient) { }

  getAllSymptomInfos(): Observable<any> {
    return this.http.get(`${APi_URL_symptoms}`);
  }
}
