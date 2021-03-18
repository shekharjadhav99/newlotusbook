import { Component,  OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { AuthService } from '../_services/auth.service';


import { ShareDataService } from '../_services/share-data.service';
import { UserService } from '../_services/user.service';


import { IRaces } from '../shared/types/races';
import { interval,Subscription } from 'rxjs';
import { OddsServiceService } from '../_services/odds-service.service';
import { DataFormatService } from '../_services/data-format.service';
import { GamesService } from '../_services/games.service';
import { GenericResponse } from '../shared/types/generic-response';
import {FullmarketService } from '../_services/fullmarket.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  subscriptions = new Subscription();
 
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
      this.common.updateBalance()
      

      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
        }
      });
      this.gamesService
        .horseRacingGames()
        .subscribe((res: GenericResponse<IRaces>) => {
          this.dataFormatService.getOtherGames(res.result);
        });
      this.gamesService
        .greyhoundGames()
        .subscribe((res: GenericResponse<IRaces>) => {
          this.dataFormatService.getOtherGames(res.result);
        });
  
      this.gamesService.listGames().subscribe((res: GenericResponse<any>) => {
        if (res.errorCode === 0) {
          this.dataFormatService.getSportsData(res.result);
        }
      });
      let intervalSub = interval(15000).subscribe(() => {
        this.gamesService
          .horseRacingGames()
          .subscribe((res: GenericResponse<IRaces>) => {
            this.dataFormatService.getOtherGames(res.result);
          })
        this.gamesService
          .greyhoundGames()
          .subscribe((res: GenericResponse<IRaces>) => {
            this.dataFormatService.getOtherGames(res && res.result);
          });
        this.gamesService.listGames().subscribe((res: GenericResponse<any>) => {
          if (res.errorCode === 0) {
            this.dataFormatService.getSportsData(res.result);
          }
        });
      });
      this.subscriptions.add(intervalSub);
  
      this.userService.getBalance();
      this.userService.getBets();
  
      let balanceInterval = interval(5000).subscribe(() => {
        this.userService.getBalance();
        this.userService.getBets();
      });
  
      // this.subscriptions.add(balanceInterval);
  
      let pingInterval = interval(5000).subscribe(() => {
        this.authService.ping().subscribe(() => {});
      });
  
      this.subscriptions.add(pingInterval);
      this.subscriptions.add(balanceInterval);
    }
  
    
  
    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
  }
  