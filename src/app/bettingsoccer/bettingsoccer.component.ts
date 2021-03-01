import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bettingsoccer',
  templateUrl: './bettingsoccer.component.html',
  styleUrls: ['./bettingsoccer.component.css']
})
export class BettingsoccerComponent  {

  constructor(private _location: Location) { }

  backClicked() {
    this._location.back();
  }
}