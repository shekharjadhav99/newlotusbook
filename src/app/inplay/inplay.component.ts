import { Component, OnInit } from '@angular/core';
import { DataFormatService } from '../_services/data-format.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {
  inplay;
  inplayListData;
  inplayRunnerData;
  constructor( private _location: Location,
    private dataformatService: DataFormatService
  ) { }

  ngOnInit(): void {
    
    this.dataformatService.sportsData$.subscribe((sportsData) => {
      this.inplayListData = this.dataformatService.inplaylistwise(sportsData, 0).map((inplay) => {
        inplay.collapsed = true;
        return inplay;
      });
    })
  }

  trackByFn(item, index) {
    return item.matchId;
  }

}
