import { Component, OnInit } from '@angular/core';
import { Line } from 'src/app/models/linija';
import { FormBuilder, Validators } from '@angular/forms';
import { RasporedService } from 'src/app/services/raspored/raspored.service';
import { Departure } from 'src/app/models/polazak';
import { LinijeService } from 'src/app/services/linije/linije.service';
import { RedvoznjeAdminService } from 'src/app/services/redvoznje-admin/redvoznje-admin.service';

@Component({
  selector: 'app-redvoznje-admin',
  templateUrl: './redvoznje-admin.component.html',
  styleUrls: ['./redvoznje-admin.component.css']
})
export class RedvoznjeAdminComponent implements OnInit {

lines : Line[] = [];
scheduleForm = this.fb.group({
  selectedDeparture:['', Validators.required],
  editDeleteDeparture: ['', Validators.required],
  addDeparture: ['', Validators.required],
});

Departures : Departure[] = [];
selectedDayType: any = "";
selectedLineType: any = "";
i : number;
selectedLineName : any = "";
selectedDeparture : any = "";
selectedLineId : any;
selectedDepartureId : any;
editDeleteDeparture: any;

  constructor(private fb: FormBuilder, private scheduleService:RedvoznjeAdminService, private timetableService: RasporedService, private linesService : LinijeService) { }

  ngOnInit() {
    this.getLines();
  }

  getLines(){
    this.linesService.getLines().subscribe(
      data=>{
        this.lines = data;
        if(this.lines.length > 0){
          this.selectedLineId = this.lines[0].Id;
          this.selectedLineName = this.lines[0].LineName;
          this.selectedLineType = this.lines[0].LineType;
          this.selectedDayType = "0";
          this.getDepartures();
        }
      }
    );
  }

  getDepartures()
  {
    this.timetableService.getSchedule(this.selectedDayType , this.selectedLineType , this.selectedLineName).subscribe(
      data =>{
        this.Departures = data;

      });
  }

  onSelectLine(event: any)
  {
    this.selectedLineId = event.target.value;
     for(this.i = 0; this.i < this.lines.length; this.i ++)
     {
       if(this.lines[this.i].Id == event.target.value)
       {
         this.selectedLineType = this.lines[this.i].LineType;
         this.selectedLineName = this.lines[this.i].LineName;
       }
     }

     if(this.selectedDayType !== "" && this.selectedLineName !== "" && this.selectedLineType !== "")
     {
       this.getDepartures();
     }

  }

  onSelectDayType(event : any)
  {
    this.selectedDayType = event.target.value;
    if(this.selectedDayType !== "" && this.selectedLineName !== "" && this.selectedLineType !== "")
     {
       this.getDepartures();
     }
  }
  onSelectDeparture(event : any)
  {
    this.selectedDepartureId = event.target.value;
    for(this.i = 0; this.i < this.Departures.length; this.i++)
    {
      if(this.Departures[this.i].Id == event.target.value)
      {
        this.selectedDeparture = this.Departures[this.i].Departures;
        this.scheduleForm.controls.editDeleteDeparture.setValue(this.Departures[this.i].Departures);
      }
    }
  }

  onClickEdit(){
    this.scheduleService.editDeparture(this.selectedDepartureId, this.scheduleForm.controls.editDeleteDeparture.value).subscribe(
      data =>{
        this.getDepartures();
        this.scheduleForm.reset();
      }
    );
  }

  onClickDelete(){
    this.scheduleService.deleteDeparture(this.selectedDepartureId).subscribe(
      data =>{
        this.getDepartures();
        this.scheduleForm.reset();
      }
    );
  }

  onClickAdd(){
    this.scheduleService.addDepartures(this.selectedLineId, this.selectedDayType, this.scheduleForm.controls.addDeparture.value).subscribe(
      data =>{
        this.getDepartures();
        this.scheduleForm.reset();
      }
    );
  }



}
