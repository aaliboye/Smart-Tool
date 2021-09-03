import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon, circle, polygon, geoJSON, Marker } from 'leaflet';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import 'leaflet.heat/dist/leaflet-heat.js';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { MapService } from '../service/map.service';
// import {DatePipe} from '@angular/common';
import * as L from 'leaflet';
import { ActivationGpsService } from '../providers/activation-gps-service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;
// fonction global pour la couleur et style
function getColor(d) {
  return d > 1000 ? '#800026' :
    d > 500 ? '#E31A1C' :
      d > 200 ? '#FC4E2A' :
        d > 50 ? '#fea43e' :
          // d > 20   ? '#FEB24C' :
          d > 1 ? '#FED976' :
            'rgba(255,237,160,0)';
}
// Gestion de l'intensité du heatmap
function getintensite(d) {
  return d > 100 ? 99 :
    d > 50 ? 70 :
      d > 20 ? 45 :
        d > 10 ? 30 :
          d > 5 ? 20 :
            d > 2 ? 8 :
              d > 1 ? 3 :
                1;
}

function style(feature) {
  return {
    fillColor: getColor(feature.numberOfConfirmedCases),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.6
  };
}


// @ts-ignore
// tslint:disable-next-line:prefer-const
let info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info1'); // create a div with a class "info"
  this.update();
  return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  if (props) {
    this._div.innerHTML = '<h4>' + props.name + '</h4>' +
      '<br /> <p>' + 'Nombre de cas confirmé(s) : ' + '<b>'
      + props.numberOfConfirmedCases + '</b>';
    setTimeout(() => { this._div.innerHTML = 'informations du district'; }, 4000);
  } else {
    this._div.innerHTML = 'informations du district';
  }
};


function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function onEachFeature(feature, layer) {
  layer.on({
    click: highlightFeature
  });
}
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  map: Map;
  newMarker: any;
  zone: any = [];
  circle = circle;
  mapurl: SafeResourceUrl;
  todaydate: Date = new Date();
  private temp: any;


  constructor(private httpClient: HttpClient, private platform: Platform, private mapservice: MapService, private domsa: DomSanitizer,
    public activationGpsService: ActivationGpsService,
  ) {
  }
  ngOnInit() {
    this.gotoGeolocalisation();

  }
  gotoGeolocalisation() {
    this.activationGpsService.checkGPSPermission();
  }
  ngAfterViewInit() {
    this.map = new Map('mapId');
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      //   {
      //     attribution:
      //         'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
      //         <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      //   }
    ).addTo(this.map);
    // }
    this.locateMyPosition();
    this.mapservice.listerprevalences().subscribe((prevalence) => {
      console.log(prevalence.prevalences);
      this.loadMap(prevalence);
    });
    this.legend();
    info.addTo(this.map);

    console.log(this.zone);
  }


  legend() {
    // @ts-ignore
    const legend = new L.control({ position: 'bottomright' });

    // tslint:disable-next-line:only-arrow-functions
    legend.onAdd = function (map) {

      const div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 50, 200, 500],
        labels = [];
      div.innerHTML += '<h4>Nombre de cas confirmés</h4>' + '<br>';
      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
    };

    legend.addTo(this.map);

  }



  loadMap(prevalence) {
    for (const j of prevalence.prevalences) {
      this.zone.push([j.Zone.latitude, j.Zone.longitude, getintensite(j.numberOfConfirmedCases)]);

      if (j.Zone.polygon != null) {
        var selected;
        var geojsonFeature: GeoJSON.Feature = {
          type: "Feature",
          "properties": {
            "name": j.Zone.name,
            "numberOfContactsCases": j.numberOfContactsCases,
            "numberOfRecoveredCases": j.numberOfRecoveredCases,
            "numberOfSupectedCases": j.numberOfSupectedCases,
            "numberOfConfirmedCases": j.numberOfConfirmedCases
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [j.Zone.polygon]
          }
        };
        const polygo = geoJSON(geojsonFeature, {style: style(j)})
          // tslint:disable-next-line:only-arrow-functions
          .on('click', function (e) {
            // Check for selected
            info.update(e.layer.feature.properties);

            if (selected) {
              console.log(selected);

              // Reset selected to default style
              selected.setStyle({
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.6
              });
            }
            // Assign new selected
            selected = e.layer;
            // Bring selected to front
            selected.bringToFront();
            // Style selected
            selected.setStyle({
              color: 'rgb(255,19,21)',
              dashArray: '',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.9
            });

          }).addTo(this.map);
      }
    }
  }
  locateMyPosition() {
    this.map.locate({ setView: true, maxZoom: 12, enableHighAccuracy: true }).on('locationfound', (e: any) => {
      console.log('location', e);
      // Si la localisation es disponible on integrera notre position
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable: false
      }).addTo(this.map);
      this.newMarker.bindPopup('<p>Ma position</p>');
    });

  }
}
