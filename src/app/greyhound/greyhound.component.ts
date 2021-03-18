import { Component, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';
import { DataFormatService } from '../_services/data-format.service';
import {Location} from '@angular/common';

import { OddsServiceService } from '../_services/odds-service.service';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';
import { GamesService } from '../_services/games.service';

@Component({
  selector: 'app-greyhound',
  templateUrl: './greyhound.component.html',
  styleUrls: ['./greyhound.component.css']
})
export class GreyhoundComponent implements OnInit {
  sportsDataVal: boolean = false;
  intervalSub = new Subscription();
  selectedSportId: number = 4339;
  selectedSport: string;
  Highlightlist: any[];
  matchDataHome = {};
  subscription: any;

 

  constructor(private activatedRoute:ActivatedRoute,
     private _location: Location,
     
    private dataformatService: DataFormatService,
    private gamesService:GamesService,
    private oddsService: OddsServiceService) { }

    backClicked() {
      this._location.back();
    }
    ngOnInit():void {
      
      this.getOddsData();
      this.subscription.add(
        interval(15000).subscribe(() => {
          //here interval from rxjs
          this.getOddsData();
        })
      );
    }
  
    getOddsData() {
      this.dataformatService.sportsData$.subscribe(() => {
        this.Highlightlist = this.dataformatService.highlightwisedata(4);
        //console.log('High Light list', this.Highlightlist);
        console.log('Greyhound highlight list', this.Highlightlist);
        var ids = [];
        this.Highlightlist.forEach((match, index) => {
          if (this.selectedSportId === +match.SportbfId) {
            ids.push(match.bfId);
            //console.log('ids', match.bfId);
          }
        });
        if (ids.length) {
          this.oddsService
            .getMatchOdds(this.selectedSportId, ids.join(','))
            .subscribe((res: any[]) => {
              res.forEach((market) => {
                this.matchDataHome[market.eventId] = market;
                //console.log('market' + market);
              });
            });
        }
      });
    }
    trackByFn(item, index) {
      return item.matchId;
    }
  }
  
