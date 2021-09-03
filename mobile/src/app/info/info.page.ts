import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APi_URL_DIFF, APi_URL_INFO, APi_URL_MONDIALE} from '../../environments/environment';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {DailyService} from '../providers/daily.service';

// import {Socket} from 'ngx-socket-io';


import 'rxjs/add/operator/map';
import {CacheService} from 'ionic-cache';


@Component({
    selector: 'app-info',
    templateUrl: './info.page.html',
    styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

    
    public dailyReportsMondial: any = [];
    segment: string;
    today: number = Date.now();
    public urlPdf;

    constructor(public httpClient: HttpClient, public router: Router, private platform: Platform,
                private dailyService: DailyService, public cacheService: CacheService
    ) {
    }

    ngOnInit() {
        this.loadDataSegment1();
        this.loadDataSegment2();
        this.loadDataSegment3();

        
        this.viewSegment();

    }

    viewSegment() {
        this.segment = "segment3"
    }

    redirect() {
        this.router.navigateByUrl('/welcome');
    }

    loadDataSegment1() {
        

    }

    loadDataSegment2() {
        

    }

    loadDataSegment3() {
        let url = APi_URL_MONDIALE;
        let cacheKey = url;
        let request = this.httpClient.get(url);
        this.cacheService.loadFromObservable(cacheKey, request).subscribe((value) => {
            console.log(this.dailyReportsMondial = value);
        });

    }

}
