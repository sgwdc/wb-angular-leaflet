import { Component } from '@angular/core';
import { latLng, tileLayer, icon } from 'leaflet';
import * as L from 'leaflet';
import {
  GeoSearchControl,
  EsriProvider,
} from 'leaflet-geosearch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  baseLayers = [
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OpenStreetMap' }),
    tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=081af2bf069048f9ac676796465d77bf', { maxZoom: 18, attribution: 'OpenCycleMap' }),
  ];
  options = {
    /*
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OpenStreetMap' }),
    ],
    */
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
    center: latLng(30, 0),
  };
  layersControl = {
    baseLayers: {
      'OpenStreetMap': this.baseLayers[0],
      'OpenCycleMap': this.baseLayers[1],
    },
    overlays: {
      'Gridded Population of the World, Version 4 (2015)': tileLayer.wms('https://sedac.ciesin.columbia.edu/geoserver/wms', {
        layers: 'gpw-v4:gpw-v4-population-density_2015',
        format: 'image/png',
        transparent: true,
      }),
      'Global Grid of Probabilities of Urban Expansion to 2030, v1': tileLayer.wms('https://sedac.ciesin.columbia.edu/geoserver/wms', {
        layers: 'lulc:lulc-global-grid-prob-urban-expansion-2030',
        format: 'image/png',
        transparent: true,
      }),
      'UNESCO Transboundary River Basins around the World': tileLayer.wms('http://ihp-wins.unesco.org/geoserver/ows?SERVICE=WMS&', { // Found via: https://www.geoseer.net/
        layers: 'geonode:transboundary_river_basins',
        format: 'image/png',
        transparent: true,
      }),
    },
  };
  layersControlOptions = {
    // Always show the layer options
    collapsed: false,
  };

  // Called when the map has finished loading
  onMapReady(map: L.Map) {
    // Add Esri geocoder to the map
    const provider = new EsriProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      marker: {
        // Configure Leaflet to use the correct URLs as marker images
        icon: icon({
          iconUrl: 'src/assets/marker-icon.png',
          shadowUrl: 'src/assets/marker-shadow.png'
        })
      }
    });
    map.addControl(searchControl);
    // Make the first basemap the default
    map.addLayer(this.baseLayers[0]);
  }
}
