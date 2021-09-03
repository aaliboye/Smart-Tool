import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Map, tileLayer, marker, circle, polygon, geoJSON, polyline, point, icon} from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-histo-map',
  templateUrl: './histo-map.page.html',
  styleUrls: ['./histo-map.page.scss'],
})
export class HistoMapPage implements OnInit, AfterViewInit {

  zones: any = [] ;
  zones2: any = [] ;
  constructor(public modalController: ModalController, public navParams: NavParams) {
    this.zones = navParams.get('name')
    // console.log(this.zones2);

  }
  @Input() name: any = [];
  map: Map;
  ngOnInit() {
  }
  ngAfterViewInit() {
     this.map = new Map('mapId2');
    //  this.map = new Map('mapId');
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // {
        //   attribution:
        //       'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        // }
    ).addTo(this.map);
     this.locatePosition();

    for (const i of this.zones){
      console.log(i._source.position)
      this.zones2.push([i._source.position.lat, i._source.position.lon])
    }
    const circles =  polyline([this.zones2], {
      color: 'blue',
      weight: 5,
      opacity: 0.9,
      smoothFactor: 1
    });

    const markPoint = marker([14.7616734, -17.4676976]);
    markPoint.addTo(this.map)
     circles.addTo(this.map);
     circles.bindPopup('<p>Historique déplacement</p>').openPopup().addTo(this.map);
     circles.getBounds();
    // this.map.addLayer(circles)
    //  this.map.fitBounds(circles.getBounds());


  }
  // onMapReady(map: Map) {
  //   map.fitBounds(circles.getBounds(), {
  //     padding: point(24, 24),
  //     maxZoom: 12,
  //     animate: true
  //   });
  // }
  closeModal() { this.modalController.dismiss(); }
  locatePosition() {
    this.map.locate({ setView: true, maxZoom: 11 , enableHighAccuracy : true}).on('locationfound', (e: any) => {
      console.log('location', e);
      // Si la localisation es disponible on integrera notre position
    });

  }
  onMapReady(map: Map) {
    map.fitBounds(this.zones .getBounds(), {
      padding: point(24, 24),
      maxZoom: 12,
      animate: true
    });
  }
}
