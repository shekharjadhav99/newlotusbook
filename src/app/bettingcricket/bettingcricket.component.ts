import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bettingcricket',
  templateUrl: './bettingcricket.component.html',
  styleUrls: ['./bettingcricket.component.css']
})
export class BettingcricketComponent  {

  constructor(private _location: Location) { }

  backClicked() {
    this._location.back();
  }
}