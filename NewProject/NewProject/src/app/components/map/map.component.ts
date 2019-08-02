import { Component, OnInit, Input, NgZone } from '@angular/core';
import { MarkerInfo } from './model/marker-info.model';
import { GeoLocation } from './model/geolocation';
import { Polyline } from './model/polyline';

import {Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

  @Output() coordChanged: EventEmitter<Array<number>> = new EventEmitter();

  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
      "assets/ftn.png",
      "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

      this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  constructor(private ngZone: NgZone){
  }

  placeMarker($event){
    console.log(window.location.href);
    if(window.location.href == "http://localhost:4200/stanica")
    {
      this.coordChanged.emit(new Array(this.markerInfo.location.latitude,this.markerInfo.location.longitude));
    }
    else{
      this.polyline.addLocation(new GeoLocation($event.coords.lat, $event.coords.lng));
      console.log(this.polyline);
    }
  }
  
}
