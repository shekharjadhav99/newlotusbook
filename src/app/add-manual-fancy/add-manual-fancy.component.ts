import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-manual-fancy',
  templateUrl: './add-manual-fancy.component.html',
  styleUrls: ['./add-manual-fancy.component.css']
})
export class AddManualFancyComponent  {

  constructor(private _location: Location) { }

  backClicked() {
    this._location.back();
  }
}