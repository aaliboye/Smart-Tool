import {Component, Input, OnInit} from '@angular/core';
import {Map, tileLayer, marker, circle, polygon, geoJSON, polyline, point, icon, latLng} from 'leaflet';
import * as L from 'leaflet';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-maptest',
  templateUrl: './maptest.component.html',
  styleUrls: ['./maptest.component.scss'],
})
export class MaptestComponent {
  public zones: any = [];
  public zones2: any = [];
  constructor(public modalController: ModalController, public navParams: NavParams) {
    this.zones = navParams.get('name');
    // console.log(this.zones2);

  }
  @Input() name: any = [];
  map: Map;
  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    // attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    // attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
  });

  // Marker for the top of Mt. Ranier
  summit = marker([14.6675661, -17.4328936], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-icon.png'
    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([14.751544, -17.396413], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: ''
    })
  });

  // Path from paradise to summit - most points omitted from this example for brevity
  // route = polyline([this.DataShow()]);
  route = polyline([this.DataShow()]);

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
      'Mt. Rainier Climb Route': this.route,
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.wMaps, this.route, this.summit, this.paradise],
    zoom: 7,
    center: latLng([14.758944599999998, -17.3937536])
  };

  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
    map.fitBounds(this.route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 18,
      animate: true
    });
  }
  DataShow() {
    for (const i of this.navParams.get('name')){
      this.zones2.push([i._source.position.lat, i._source.position.lon])
    }
    return this.zones2;
  }


  dismiss() {
    this.modalController.dismiss();
  }
}
