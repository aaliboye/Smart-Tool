import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('homeSlides', { static: true }) slides: IonSlides;
  constructor(public router: Router) {
  }

  goToNextSlide() {
    this.slides.slideNext();
  }

  redirect() {
    this.router.navigateByUrl('/validation-phone');
  }

}
