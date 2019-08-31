import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { StanicaService } from 'src/app/services/stanica/stanica.service';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'app-stanica',
  templateUrl: './stanica.component.html',
  styleUrls: ['./stanica.component.css']
})
export class StanicaComponent implements OnInit {
  addStationForm = this.fb.group({
    name : ['', Validators.required],
    address : ['', Validators.required],
    xCoordinate : ['', Validators.required],
    yCoordinate : ['', Validators.required],
   });

   editOrRemoveStationForm = this.fb.group({
    name : ['', Validators.required],
    address : ['', Validators.required],
    xCoordinate : ['', Validators.required],
    yCoordinate : ['', Validators.required],
    stations : ['',  Validators.required]
   });

   stations: Station[] = [];
   selectValue: any;
   selectedStation: Station;
   station : Station;
   lines : string[] = [];

  constructor(private fb: FormBuilder, private stationService: StanicaService) { this.getStations();}

  ngOnInit() {
    this.getStations();
  }

  onSelect(event : any){
    this.selectValue = event.target.value;
    this.stationService.getStation(this.selectValue).subscribe(s => {
      this.selectedStation = s;
      this.editOrRemoveStationForm.controls.name.setValue(s.Name);
      this.editOrRemoveStationForm.controls.address.setValue(s.Address);
      this.editOrRemoveStationForm.controls.xCoordinate.setValue(s.XCoordinate);
      this.editOrRemoveStationForm.controls.yCoordinate.setValue(s.YCoordinate);
    });
    this.findLines();
  }

  addStation(){
    this.stationService.addStation(this.addStationForm.value).subscribe(
      data => {
        this.getStations();
        window.alert("Uspesno dodana stanica" + data.Id);
        this.addStationForm.reset();

      }

    );
 
  }

  getStations(){
    this.stationService.getStations().subscribe(s => this.stations = s);
  }

  deleteStation()
  {
      this.stationService.deleteStation(this.selectValue).subscribe(
        d=>{
          this.getStations();
          window.alert("Stanica je uspesno obrisana " + this.selectValue);
          this.selectValue = "";
          this.editOrRemoveStationForm.reset();
        }
      );
  }

  findLines()
  {
    this.stationService.findLines(this.selectValue).subscribe(
      data => {
        this.lines = data;
      }
    );

  }
  editStation()
  {
      this.stationService.editStation(this.editOrRemoveStationForm.value, this.selectValue).subscribe(
        data =>{
          this.getStations();
          window.alert("USPESNO MENJANJE STANICE SA ID: " + this.selectValue);
          this.editOrRemoveStationForm.reset();
        }
      );
     
    }  
  }


