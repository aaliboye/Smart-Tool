import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';

@Component({
  selector: 'app-jardin-list',
  templateUrl: './jardin-list.page.html',
  styleUrls: ['./jardin-list.page.scss'],
})
export class JardinListPage implements OnInit {

  constructor(private platform: Platform) { }

  ngOnInit() {}

}
