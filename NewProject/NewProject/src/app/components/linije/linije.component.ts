import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import {LinijeService} from 'src/app/services/linije/linije.service';
import { Line } from 'src/app/models/linija';
import { Station } from 'src/app/models/station';
import { StanicaService } from 'src/app/services/stanica/stanica.service';
import { ConditionalExpr } from '@angular/compiler';



@Component({
  selector: 'app-linije',
  templateUrl: './linije.component.html',
  styleUrls: ['./linije.component.css']
})
export class LinijeComponent implements OnInit {
  addLineForm = this.fb.group({
    lineName : ['', Validators.required],
    lineType : ['', Validators.required],
   });

   editOrRemoveLineForm = this.fb.group({
    lineName : ['', Validators.required],
    lineType : ['', Validators.required],
    lines : ['', Validators.required],
   });

   lines : Line [] = [];
   selectValue: any;
   selectedLine: any;
   allStations: Station[] = [];
   stationsId: number[] = [];
   i: number;

  constructor(private fb: FormBuilder, private linesService: LinijeService, private stationService: StanicaService) { }

  ngOnInit() {
    this.getLines();
    this.getAllStations();
  }

  getLines(){
    this.linesService.getLines().subscribe(
      data=>{
        this.lines = data;
      }
    );
  }

  onSelect(event: any){
    this.selectValue = event.target.value;

    this.linesService.getLine(this.selectValue).subscribe(l => {
      this.selectedLine = l;
      this.editOrRemoveLineForm.controls.lineName.setValue(l.LineName);
      this.editOrRemoveLineForm.controls.lineType.setValue(l.LineType);
    });
    this.getAllStations();
  }

  addLine(){
    this.linesService.addLine(this.stationsId, this.addLineForm.controls.lineName.value, this.addLineForm.controls.lineType.value).subscribe(
      data => {
        this.getLines();
        //window.alert("Uspesno dodana linija" + data.Id);
        this.addLineForm.reset();
      }
    );
 
  }

  deleteLine()
  {
    this.linesService.deleteLine(this.selectValue).subscribe(
      d=>{
        this.getLines();
        window.alert("Linija je uspesno obrisana " + this.selectValue);
        this.selectValue = "";
        this.editOrRemoveLineForm.reset();
      }
    );
  }

  editLine()
  {
    this.linesService.editLine(this.editOrRemoveLineForm.value, this.selectValue).subscribe(
      data =>{
        this.getLines();
        window.alert("USPESNO MENJANJE LINIJE SA ID: " + this.selectValue);
        this.editOrRemoveLineForm.reset();
      }
    );
  }

  getAllStations()
  {
    this.stationService.getStations().subscribe(
      data =>{
        this.allStations = data;
      });
  }

    checkValue(event : any, id: any)
    {
      console.log(id);
      console.log(event.currentTarget.checked);
      if(event.currentTarget.checked)
      {
        this.stationsId.push(id);
      }
      else
      {
        for(this.i = 0; this.i < this.stationsId.length; this.i++)
        {
            if(this.stationsId[this.i] == id)
            {
              this.stationsId = this.stationsId.filter(s =>s != id);
            }
        }
      }
    }
}
