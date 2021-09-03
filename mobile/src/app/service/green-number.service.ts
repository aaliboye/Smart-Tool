import { Injectable } from '@angular/core';
import {API_URL} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreenNumberService {

  constructor(private http: HttpClient) { }

  getAllGreenNumbers(): Observable<any> {
    return this.http.get(`${API_URL}/green-numbers`);
  }
}
