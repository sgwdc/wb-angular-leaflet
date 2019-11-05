import { Component } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'World Bank Central IT - Angular/Node/Leaflet demo';
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    /* World Bank HQ
    zoom: 17,
    center: latLng(38.898947, -77.042478)
    */
    /* Continental U.S.
    zoom: 4,
    center: latLng(39.8333333,-98.585522)
    */
    // Earth
    zoom: 2,
    center: latLng(30, 0)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=081af2bf069048f9ac676796465d77bf', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'GPWv4: Population Density - 2015': tileLayer.wms('https://sedac.ciesin.columbia.edu/geoserver/wms', {
        layers: 'gpw-v4:gpw-v4-population-density_2015',
        format: 'image/png',
        transparent: true,
      }),
      'Probabilities of Urban Expansion to 2030': tileLayer.wms('https://sedac.ciesin.columbia.edu/geoserver/wms', {
        layers: 'lulc:lulc-global-grid-prob-urban-expansion-2030',
        format: 'image/png',
        transparent: true,
      }),
    }
  };
}
