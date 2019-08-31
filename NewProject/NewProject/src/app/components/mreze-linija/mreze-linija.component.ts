import { Component, OnInit } from '@angular/core';
import { MarkerInfo } from '../map/model/marker-info.model';
import { Polyline } from '../map/model/polyline';
import { LinijeService } from 'src/app/services/linije/linije.service';
import { GeoLocation } from '../map/model/geolocation';
import { Line } from 'src/app/models/linija';
import { Station } from 'src/app/models/station';
import { StanicaService } from 'src/app/services/stanica/stanica.service';
import { AgmCoreModule} from '@agm/core';

@Component({
  selector: 'app-mreze-linija',
  templateUrl: './mreze-linija.component.html',
  styleUrls: ['./mreze-linija.component.css']
})
export class MrezeLinijaComponent implements OnInit {

  markerInfo: MarkerInfo;
  selectedLine: Polyline;
  iconPath: any = { url:"assets/busicon.png", scaledSize: {width: 35, height: 35}};
  lines: Line[] = null;
  stations: Station[] = new Array<Station>();
  stationsIds: number[] = null;

  constructor(private lineService: LinijeService, private stationService: StanicaService) { }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.232268, 19.842954),
    "assets/images/ftn.png",
    "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selectedLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.getLines();
  }

  getLines(){
    this.lineService.getLines().subscribe(
      response => {
        this.lines = response;
      });
  }

  onSelectLine(event: any){
    this.stations = new Array<Station>();
    this.selectedLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.lineService.getLineStations(event.target.value).subscribe(
      response =>{
        this.stationsIds = response;
        this.stationsIds.forEach(stationId => {
          this.stationService.getStation(stationId).subscribe(
            station =>{
              this.stations.push(station);
              this.selectedLine.addLocation(new GeoLocation(station.XCoordinate, station.YCoordinate)); 
            }
          );
        });
      }
    );
  }

}
