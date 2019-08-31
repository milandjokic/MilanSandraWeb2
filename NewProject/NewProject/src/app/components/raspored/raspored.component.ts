import { Component, OnInit } from '@angular/core';
import { Line } from 'src/app/models/linija';
import {Departure} from 'src/app/models/polazak'
import { RasporedService } from 'src/app/services/raspored/raspored.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrls: ['./raspored.component.css']
  
})


export class RasporedComponent implements OnInit {
  
  ngOnInit() {  
  }

  constructor(private rasporedService : RasporedService , public router: Router, private fb: FormBuilder,) { }

  Lines : Line[] = [];
  Departures : Departure[] = [];
 
  selectedDayType : any = 'Weekday';
  selectedLineType : any = 'City';
  selectedLineName: any;

  timetableForm = this.fb.group({
    dayType: [''],
    lineType: [''],
    lineName: [''],
  });
  

  getLines(event : any)
  {    
    this.selectedDayType = this.timetableForm.controls.dayType.value;
    this.selectedLineType = this.timetableForm.controls.lineType.value;
    this.selectedLineName = this.timetableForm.controls.lineName.value;
    this.timetableForm.controls.lineName.setValue('');
    this.rasporedService.getLines(this.selectedLineType).subscribe(c=>this.Lines = c);
  }

  getTimetable()
  {
    this.selectedDayType = this.timetableForm.controls.dayType.value;
    this.selectedLineType = this.timetableForm.controls.lineType.value;
    this.selectedLineName = this.timetableForm.controls.lineName.value;
    this.rasporedService.getSchedule(this.selectedDayType , this.selectedLineType , this.timetableForm.controls.lineName.value).subscribe((c: Departure[]) => this.Departures = c)
  }

}

