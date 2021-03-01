import { Component,  OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { AuthService } from '../_services/auth.service';


import { ShareDataService } from '../_services/share-data.service';
import { UserService } from '../_services/user.service';
import {FullmarketService} from '../_services/fullmarket.service';

import { IRaces } from '../shared/types/races';
import { interval, Subscription } from 'rxjs';
import { OddsServiceService } from '../_services/odds-service.service';
import { DataFormatService } from '../_services/data-format.service';
import { GamesService } from '../_services/games.service';
import { GenericResponse } from '../shared/types/generic-response';
import { data } from 'jquery';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  subscriptions = new Subscription();
  intervalSub = new Subscription();
  currentMatchData = [];
  matchid;
  matchName: any;
  matchDataHome = {};
  matchedData: any;
  selectedSportId: number;
  constructor(private common: CommonService,
    private fullmarketService:FullmarketService,

    private games :GamesService,
    private oddsService: OddsServiceService,
    private gamesService: GamesService,
    private dataFormatService: DataFormatService,
    private authService: AuthService,
    private userService: UserService,
    private shareDataService: ShareDataService) { }
  

  ngOnInit(): void {

    this.gamesService
    .horseRacingGames()
    .subscribe((res: GenericResponse<IRaces>) => {
      this.dataFormatService.getOtherGames(res.result);
    });
    this.gamesService.listGames().subscribe((res: GenericResponse<any>) => {
      if (res.errorCode === 0) {
        this.dataFormatService.getSportsData(res.result);
      }
    });
    

    
    this.oddsService
        .getMatchOdds(this.selectedSportId, (','))
        .subscribe((res: any[]) => {
          res.forEach((market) => {
            this.matchDataHome[market.eventId] = market;
          });
        });
    this.userService.openBets$.subscribe((bets) => {
      console.log(bets);
      this.matchedData = bets;
    });
   this.common.updateBalance()
   this.games.listGames().subscribe((data:any)=>{
    console.log('All data',data);



    this.dataFormatService.getSportsData(data.result);
    this.games.greyhoundGames().subscribe((res)=>{
      console.log('data in greyonds',res);
      
    })
    


   });
   

  }
  

}
