import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Api_Url_Histo} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {MaptestComponent} from '../maptest/maptest.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-historiqueday',
  templateUrl: './historiqueday.page.html',
  styleUrls: ['./historiqueday.page.scss'],
})
export class HistoriquedayPage implements OnInit {
   dateToday: any = new Date();
   dateToday1: any = Date.now();
  yesterday = new Date((Date.now()).valueOf() - 1000*60*60*24);

  private data1Histo1 = [];
  private data1Histo2 = [];
  constructor(public router: Router, public httpClient: HttpClient, public datePipe: DatePipe, public modalController: ModalController) { }

  ngOnInit() {
    this.loadHistorique1()
    this.loadHistorique2()
  }

  redirect() {
    this.router.navigateByUrl('/welcome')
  }
  loadHistorique1() {

    this.httpClient.get(Api_Url_Histo + '/' + this.convertDate(this.dateToday) + '/' + this.convertDate(this.dateToday)).subscribe((value) => {
          this.data1Histo1 = value["zones"];

        }, error =>  console.log('erreur')
    );
  }
  loadHistorique2() {

    this.httpClient.get(Api_Url_Histo + '/' + this.convertDate(new Date((Date.now()).valueOf() - 1000*60*60*24)) + '/' + this.convertDate(new Date((Date.now()).valueOf() - 1000*60*60*24))).subscribe((value) => {
          this.data1Histo2 = value["zones"];
        }, error =>  console.log('erreur')
    );
  }

  convertDate(date) {
    const date1 = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date1
  }
  async showModal(source) {
    console.log(source)
    // const modal = await this.modalController.create({
    //   component: MaptestComponent,
    //   componentProps: {
    //     'name': source
    //   },
    //   cssClass: 'cart-modal'
    // });
    // return await modal.present();
  }
}
