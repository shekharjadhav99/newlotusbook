import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';   
                                                      

@Component({
  selector: 'app-sportpl',
  templateUrl: './sportpl.component.html',
  styleUrls: ['./sportpl.component.css']
})
export class SportplComponent implements OnInit {
  myDateValue: Date;
  minDate:Date;
  maxDate:Date;

  constructor(private _location: Location) { }

  backClicked() {
  this._location.back();
   }
  

  ngOnInit(): void {
    myDateValue: Date;
    minDate:Date;
    maxDate:Date;
      
    }
    onDateChange(newDate: Date) {
      console.log(newDate);
  
  }
  Save(selectedDate){
    alert(selectedDate)
    if(selectedDate<this.maxDate){
    if(selectedDate<this.myDateValue){
      alert("Flashback")
    }
    else(selectedDate>this.myDateValue)
      alert("Future")
    }
    else 
  alert("Too far")
  }
  
  }
  
  
  
