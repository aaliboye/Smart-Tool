import {Component, OnInit} from '@angular/core';
import {HistoriqueService} from '../service/historique.service';
import {HttpClient} from '@angular/common/http';
import {APi_URL_DIFF, Api_Url_Histo, Api_Url_RISK} from '../../environments/environment';
import {LoadingController, ModalController, PickerController} from '@ionic/angular';
import {Map} from 'leaflet';
import {DatePipe} from '@angular/common';
import {MaptestComponent} from '../maptest/maptest.component';
import {Router} from '@angular/router';
import {CacheService} from 'ionic-cache';

@Component({
    selector: 'app-historique',
    templateUrl: './historique.page.html',
    styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
    dateToday: any = new Date();
    yesterday = new Date((Date.now()).valueOf() - 1000 * 60 * 60 * 24);
    weeksData = new Date((Date.now()).valueOf() - 1000 * 60 * 60 * 24 * 21);
    length10: any;
    length11: any;
    length12: any;
    date1: any;
    length2: number;
    date2: any;
    map: Map;


    public data1histo: any;
    public data2histo: any;
    public data3histo: any;


    loaderToShow: any;
    length3: any;


    constructor(public loadingController: LoadingController, public historiqueService: HistoriqueService,
                public httpClient: HttpClient, public modalController: ModalController, private datePipe: DatePipe,
                private pickerController: PickerController, public router: Router,public cacheService: CacheService
    ) {

    }

    ngOnInit() {

        this.loadHistorique();
        this.loadHistorique1();
        this.loadHistorique2();
    }


    async showModal(source) {
        const modal = await this.modalController.create({
            component: MaptestComponent,
            componentProps: {
                'name': source
            },
            cssClass: 'cart-modal'
        });
        return await modal.present();
    }
    async showModal2(source) {
        const modal = await this.modalController.create({
            component: MaptestComponent,
            componentProps: {
                'name': source
            },
            cssClass: 'cart-modal'
        });
        return await modal.present();
    }


    convertDate(date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    showLoader() {
        this.loaderToShow = this.loadingController.create({
            message: 'Veuillez patienter ...'
        }).then((res) => {
            res.present();

            res.onDidDismiss().then((dis) => {
                console.log('Loading dismissed!');
            });
        });
    }

    hideLoader() {
        this.loadingController.dismiss();
    }

    loadHistorique() {
        let url = Api_Url_Histo + '/' + this.convertDate(this.dateToday) + '/' + this.convertDate(this.dateToday);
        let cacheKey = url;
        let request = this.httpClient.get(url);
        this.cacheService.loadFromObservable(cacheKey, request).subscribe((value) => {
            console.log(value["zones"]);
            this.length10 = value["zones"].length
            this.data1histo = value["zones"]
        });
    }
    loadHistorique1() {
        let url = Api_Url_Histo + '/' + this.convertDate(this.yesterday) + '/' + this.convertDate(this.yesterday);
        let cacheKey = url;
        let request = this.httpClient.get(url);
        this.cacheService.loadFromObservable(cacheKey, request).subscribe((value) => {
            console.log(value["zones"])
            this.length11 = value["zones"].length
            this.data2histo = value["zones"]
        });

    }
    loadHistorique2() {

        let url = Api_Url_Histo + '/' + this.convertDate(this.weeksData) + '/' + this.convertDate(this.dateToday);
        let cacheKey = url;
        let request = this.httpClient.get(url);
        this.cacheService.loadFromObservable(cacheKey, request).subscribe((value) => {
            console.log(value["zones"])
            this.data3histo = value["zones"]
            this.length12 = value["zones"].length
        });
    }


    redirect() {
        this.router.navigateByUrl('/profile');
    }
}
