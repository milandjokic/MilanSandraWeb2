import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { KarteService } from 'src/app/services/karte/karte.service';

@Component({
  selector: 'app-validacija-karata',
  templateUrl: './validacija-karata.component.html',
  styleUrls: ['./validacija-karata.component.css']
})
export class ValidacijaKarataComponent implements OnInit {

  validateTicketForm = this.fb.group(
    {
      id : ['', Validators.required],
    }
  );

  ticketValid : any;
  show : boolean = false;

  constructor(private fb : FormBuilder, private ticketService: KarteService) { }

  ngOnInit() {
  }
  check()
  {
    
    this.show = true;
    this.ticketService.getTicket(this.validateTicketForm.controls.id.value).subscribe(
      data => {
        if(data == 200)
        {
          this.ticketValid = true;
        }
        else if(data == 204)
        {
          this.ticketValid = false;
        }
      }
    );
  }

}
