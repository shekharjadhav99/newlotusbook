import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketpl',
  templateUrl: './marketpl.component.html',
  styleUrls: ['./marketpl.component.css']
})
export class MarketplComponent implements OnInit {
  myDateValue: Date;
  minDate:Date;
  maxDate:Date;
 

  constructor() { }

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


