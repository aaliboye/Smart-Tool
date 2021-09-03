import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_URL} from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarrierGestureService {

  constructor(private http: HttpClient) { }

  getAllBarrierGestures(): Observable<any> {
    return this.http.get(`${API_URL}/barrier-gestures`);
  }

}
