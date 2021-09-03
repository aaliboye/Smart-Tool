import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Api_Url_Histo, APi_URL_INFO, Api_Url_RISK} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Historiques} from '../model/historique';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  dateToday: any = new Date();
  yesterday = new Date((Date.now()).valueOf() - 1000 * 60 * 60 * 24);
  weeksData = new Date((Date.now()).valueOf() - 1000 * 60 * 60 * 24 * 21);

  constructor(private httpClient: HttpClient, public datePipe: DatePipe) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
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
  deletePosition(id) {
    // return this.httpClient.delete<>(this.base_path + '/' + id, this.httpOptions)
    //     .pipe(
    //         retry(2),
    //         catchError(this.handleError)
    //     )
    console.log(id)
    return id
  }
  getList(): Observable<Historiques> {
    return this.httpClient.get<any>(Api_Url_Histo + '/' + this.convertDate(this.dateToday) + '/' + this.convertDate(this.dateToday))
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }
  getList1(): Observable<Historiques> {
    return this.httpClient.get<any>(Api_Url_Histo + '/' + this.convertDate(this.yesterday) + '/' + this.convertDate(this.yesterday))
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }
  getList2(): Observable<Historiques> {
    return this.httpClient.get<any>(Api_Url_Histo + '/' + this.convertDate(this.weeksData) + '/' + this.convertDate(this.dateToday))
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }


  convertDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
