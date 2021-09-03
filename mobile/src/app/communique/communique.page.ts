import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-communique',
  templateUrl: './communique.page.html',
  styleUrls: ['./communique.page.scss'],
})
export class CommuniquePage implements OnInit {

  public dailyReports: any = []
  constructor(public httpClient: HttpClient , public activeRoute: ActivatedRoute, public popoverController: PopoverController) {
  }

  ngOnInit() {
    this.DismissClick()
    this.httpClient.get('https://dk5sml6ak1pazrh09.daancovid19.sn/daily-report/' + this.activeRoute.snapshot.params["id"]).subscribe((value) => {
      console.log(this.dailyReports = value["dailyReports"][0])
    })
  }
  async DismissClick() {
    await this.popoverController.dismiss();
  }

}
