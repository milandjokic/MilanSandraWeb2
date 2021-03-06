import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
   lineStationsIds: any[] = [];
   j : number;
   lineVersion : any;


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
      
      this.lineVersion = l.Version;
      console.log(this.lineVersion);
    });
    //this.getAllStations();
    this.linesService.getLineStations(this.selectValue).subscribe(
      data =>{
          this.lineStationsIds = data;

          for(this.i = 0; this.i < this.allStations.length; this.i++)
          {
            this.allStations[this.i].Exist = false;
            for(this.j = 0; this.j < data.length; this.j++)
            {
              if(this.allStations[this.i].Id == data[this.j]){

                    this.allStations[this.i].Exist = true;
                  break;
              }
            }
          }

          
      }
    );
  }

  addLine(){
    this.linesService.addLine(this.lineStationsIds, this.addLineForm.controls.lineName.value, this.addLineForm.controls.lineType.value).subscribe(
      data => {
        this.getLines();
        //window.alert("Uspesno dodana linija" + data.Id);
        this.addLineForm.reset();
        this.getAllStations();
        for(this.i = 0; this.i < this.allStations.length; this.i++)
        {
          this.allStations[this.i].Exist = false;
        }

      }
    );
 
  }

  deleteLine()
  {
    this.linesService.deleteLine(this.selectValue).subscribe(
      d=>{
        if(d == 200)
        {

          this.getLines();
          window.alert("Linija je uspesno obrisana " + this.selectValue);
          this.selectValue = "";
          this.editOrRemoveLineForm.reset();
          this.getAllStations();
          for(this.i = 0; this.i < this.allStations.length; this.i++)
          {
            this.allStations[this.i].Exist = false;
          }
        }
        else
        {
          window.alert("Drugi admin je vec obrisao ovu liniju, molim vas refresujte stranicu");
        }

      }
    );
  }

  editLine()
  {
    this.linesService.editLine(this.editOrRemoveLineForm.controls.lineName.value, this.lineVersion, this.editOrRemoveLineForm.controls.lineType.value, this.selectValue, this.lineStationsIds).subscribe(
      data =>{
        if(data == 200)
        {

          this.getLines();
          window.alert("USPESNO MENJANJE LINIJE SA ID: " + this.selectValue);
          this.editOrRemoveLineForm.reset();
          this.getAllStations();
          for(this.i = 0; this.i < this.allStations.length; this.i++)
          {
            this.allStations[this.i].Exist = false;
          }
        }
        else if(data == 204)
        {
          window.alert("Drugi admin je vec promenio vrednosti polja, molim vas refresujte stranicu");
        }
        else if(data == 203)
        {
          window.alert("Drugi admin je vec obrisao jednu od stanica ove linije, molim vas refresujte stranicu");
        }
        else if(data == 202)
        {
          window.alert("Drugi admin je vec obrisao liniju, molim vas refresujte stranicu");
        }
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
      
      if(event.currentTarget.checked)
      {
        this.lineStationsIds.push(id);
      }
      else
      {
        for(this.i = 0; this.i < this.lineStationsIds.length; this.i++)
        {
            if(this.lineStationsIds[this.i] == id)
            {
              this.lineStationsIds = this.lineStationsIds.filter(s =>s != id);
            }
        }
      }
    }
}
