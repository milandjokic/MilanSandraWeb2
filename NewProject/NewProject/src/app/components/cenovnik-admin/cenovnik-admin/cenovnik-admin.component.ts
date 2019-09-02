import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CenovnikAdminService } from 'src/app/services/cenovnik-admin/cenovnik-admin.service';

@Component({
  selector: 'app-cenovnik-admin',
  templateUrl: './cenovnik-admin.component.html',
  styleUrls: ['./cenovnik-admin.component.css']
})
export class CenovnikAdminComponent implements OnInit {
  pricelistForm = this.fb.group({
    timeTicket : ['', Validators.required],
    dayTicket : ['', Validators.required],
    monthTicket : ['', Validators.required],
    yearTicket : ['', Validators.required],
    from: [''],
    to: [''],
   });

   pricelistAddForm = this.fb.group({
    timeTicket : ['', Validators.required],
    dayTicket : ['', Validators.required],
    monthTicket : ['', Validators.required],
    yearTicket : ['', Validators.required],
    from: [''],
    to: [''],
   });

   pricelist: any;
   prices: any[] = [];
   date : Date = new Date;
   pricelistVersion : any;

  constructor(private fb: FormBuilder, private cenovnikAdminService: CenovnikAdminService) { }

  ngOnInit() {
    this.cenovnikAdminService.getPrices().subscribe(
      data => {
        this.pricelist = data[0];
        this.prices = data[1];
        console.log(this.pricelist);
        console.log(this.prices);
        this.pricelistForm.controls.timeTicket.setValue(this.prices[0]);
        this.pricelistForm.controls.dayTicket.setValue(this.prices[1]);
        this.pricelistForm.controls.monthTicket.setValue(this.prices[2]);
        this.pricelistForm.controls.yearTicket.setValue(this.prices[3]);
        this.pricelistForm.controls.from.setValue(this.pricelist.Start);
        this.pricelistForm.controls.to.setValue(this.pricelist.End);
        console.log(this.pricelist.Version);
        this.pricelistVersion = this.pricelist.Version;
      }
    );

    this.pricelistAddForm.controls.from.setValue(this.date.toLocaleDateString());
  }

  editPricelist(){
    this.cenovnikAdminService.editPricelist(this.pricelist.Id, this.pricelistVersion, this.pricelistForm.controls.timeTicket.value, this.pricelistForm.controls.dayTicket.value, this.pricelistForm.controls.monthTicket.value, this.pricelistForm.controls.yearTicket.value).subscribe(
      data => {
        console.log('dATA');
        console.log(data);
        if(data == 200)
        {

        }
        else
        {
          window.alert("Drugi admin je vec promenio vrednosti polja, molim vas refresujte stranicu");
        }
      }
    );
  }

  addPricelist(){
    console.log(this.pricelistAddForm.controls.to.value);
    const controls = this.pricelistAddForm.controls;
    this.cenovnikAdminService.addPriceList(controls.to.value, controls.timeTicket.value, controls.dayTicket.value, controls.monthTicket.value, controls.yearTicket.value).subscribe();
  }

}
