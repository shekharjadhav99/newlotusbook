import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DataFormatService } from '../_services/data-format.service';
import {Location} from '@angular/common';

import { OddsServiceService } from '../_services/odds-service.service';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';
import { GamesService } from '../_services/games.service';

@Component({
  selector: 'app-tennis',
  templateUrl: './tennis.component.html',
  styleUrls: ['./tennis.component.css']
})
export class TennisComponent implements OnInit {
  sportsDataVal: boolean = false;
  intervalSub = new Subscription();
  selectedSportId: number = 2;
  selectedSport: string;
  Highlightlist: any[];
  matchDataHome = {};
  subscription: any;

 

  constructor( private _location: Location, private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private dataformatService: DataFormatService,
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
        this.Highlightlist = this.dataformatService.highlightwisedata(2);
        //console.log('High Light list', this.Highlightlist);
        console.log(' Tennis highlight list', this.Highlightlist);
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
  
