import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-addfancy',
  templateUrl: './addfancy.component.html',
  styleUrls: ['./addfancy.component.css']
})
export class AddfancyComponent  {

  constructor(private _location: Location) { }

  backClicked() {
    this._location.back();
  }
}
