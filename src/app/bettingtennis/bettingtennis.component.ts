import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bettingtennis',
  templateUrl: './bettingtennis.component.html',
  styleUrls: ['./bettingtennis.component.css']
})
export class BettingtennisComponent  {

  
  constructor(private _location: Location) { }

  backClicked() {
    this._location.back();
  }
}