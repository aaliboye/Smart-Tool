import { Component, OnInit } from '@angular/core';
import {APi_URL_DIFF, APi_URL_INFO, APi_URL_MONDIALE} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {CacheService} from 'ionic-cache';

@Component({
  selector: 'app-jardin',
  templateUrl: './jardin.page.html',
  styleUrls: ['./jardin.page.scss'],
})
export class JardinPage implements OnInit {

  constructor(public httpClient: HttpClient, public cacheService: CacheService) { }

  ngOnInit() {
    
    this.loadDataSegment3();
  }

  public dailyReportsMondial: any = [];
  loadDataSegment3() {
    let url = APi_URL_MONDIALE;
    let cacheKey = url;
    let request = this.httpClient.get(url);
    this.cacheService.loadFromObservable(cacheKey, request).subscribe((value) => {
        console.log(this.dailyReportsMondial = value);
    });

}
}
