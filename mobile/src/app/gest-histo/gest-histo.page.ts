import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api_Url_Histo} from '../../environments/environment';
import {DatePipe} from '@angular/common';
import {LoadingController} from '@ionic/angular';
import {HistoriqueService} from '../service/historique.service';

@Component({
  selector: 'app-gest-histo',
  templateUrl: './gest-histo.page.html',
  styleUrls: ['./gest-histo.page.scss'],
})
export class GestHistoPage implements OnInit {

  date3 = '2018-04-01';
  date4 = '2022-04-01';
  public data1Histo1: any = [];
  loaderToShow: any;

  constructor(public httpClient: HttpClient, public datePipe: DatePipe, public loadingController: LoadingController, public historiqueService: HistoriqueService) { }

  ngOnInit() {
    this.loadHistorique1()
  }

  loadHistorique1() {
    // this.showLoader()
    this.httpClient.get(Api_Url_Histo + '/' + this.convertDate(this.date3) + '/' + this.convertDate(this.date4)).subscribe((value) => {
      // this.hideLoader()
          for (const testok of value["resust"]){
            this.data1Histo1.push(testok._source)
          }
          console.log(this.data1Histo1)
          console.log(value)
        }, error =>  this.hideLoader()
    );
  }
  convertDate(date) {
    const defaultLocale: string = 'fr-FR';
    const date1 = this.datePipe.transform(date, 'yyyy-MM-dd', defaultLocale);
    return date1
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
  deletePosition(id){
    this.historiqueService.deletePosition(id);
  }

}
