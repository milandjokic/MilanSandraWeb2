import { Component, OnInit } from '@angular/core';
import { TrenutnaLokacijaService } from 'src/app/services/trenutna-lokacija/trenutna-lokacija.service';
import { Station } from 'src/app/models/station';
import { Line } from 'src/app/models/linija';
import { MarkerInfo } from '../map/model/marker-info.model';
import { Polyline } from '../map/model/polyline';
import { GeoLocation } from '../map/model/geolocation';
import { LinijeService } from 'src/app/services/linije/linije.service';
import { StanicaService } from 'src/app/services/stanica/stanica.service';

@Component({
  selector: 'app-trenutna-lokacija',
  templateUrl: './trenutna-lokacija.component.html',
  styleUrls: ['./trenutna-lokacija.component.css']
})
export class TrenutnaLokacijaComponent implements OnInit {

  constructor(private trenutnaLokacijaService: TrenutnaLokacijaService, private lineService: LinijeService, private stationService: StanicaService) { }

  tempNiz: any[] = [];
  lineStationsIds: any[] = [];
  lineStations: Station[] = [];
  lines: Line[] = [];
  stations: Station[] = [];
  markerInfo: MarkerInfo;
  selLine: Polyline;
  selLineBus: Polyline;
  iconPath: any = { url:"assets/busicon.png", scaledSize: {width: 35, height: 35}};
  iconPathBus: any = { url:"assets/ftn.png", scaledSize: {width: 20, height: 20}};
  selectedLineId: any ;
  i: number;
  j: number;
  initBool: boolean = true;
  BusX: number;
  BusY: number;
  mapZoom = 14;

  isConnected: Boolean;

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.232268, 19.842954),
    "assets/ftn.png",
    "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.selLineBus = new Polyline([], 'red', { url:"assets/ftn.png", scaledSize: {width: 20, height: 20}});
    
    this.checkConnection();
    this.registerForBusLocation();
    this.getLines();
  }

  private checkConnection(){
    this.trenutnaLokacijaService.startConnection().subscribe(
      e =>{
        this.isConnected = e;
      }
    );
  }

  registerForBusLocation(){
    this.trenutnaLokacijaService.registerForBusLocation().subscribe(
      data=>{
        this.BusX = data[0];
        this.BusY = data[1];
        
        this.selLineBus = new Polyline([], 'red', { url:"assets/ftn.png", scaledSize: {width: 20, height: 20}});
        this.selLineBus.addLocation(new GeoLocation(this.BusX, this.BusY));
      }
    );
  }

  getLines(){
    this.lineService.getLines().subscribe(
      response => {
        this.lines = response;
      });
    }

    getStations(){
      this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
      this.stationService.getStations().subscribe(
        data=>{
          this.stations = data;
          this.lineService.getLineStations(this.selectedLineId).subscribe(
            data=>{
              this.lineStationsIds = data;
              for(this.i = 0; this.i < this.stations.length; this.i++){
                for(this.j = 0; this.j < this.lineStationsIds.length; this.j++){
                  if(this.stations[this.i].Id == this.lineStationsIds[this.j]){
                    this.lineStations.push(this.stations[this.i]);
                    this.selLine.addLocation(new GeoLocation(this.stations[this.i].XCoordinate, this.stations[this.i].YCoordinate));
                  }
                }
              }
              console.log(this.lineStations.length);
              
              this.trenutnaLokacijaService.BusLocation(this.lineStations);
            }
          );
        }
      );
    }

    onSelectLine(event: any){
      this.selectedLineId = event.target.value;
      this.lineStations = [];
      //this.hello();
      //this.locationService.stop();
      //this.checkConnection();
      this.getStations();
    }
  

}
