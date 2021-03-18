import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { take, timeout } from 'rxjs/operators';
import * as _ from 'underscore';
import { AuthService } from '../_services/auth.service';
import { DataFormatService } from '../_services/data-format.service';
import { UserService } from '../_services/user.service';
import { GenericResponse } from '../shared/types/generic-response';
import { IOpenBets } from '../_services/open-bets.service';
import { BetsService } from '../_services/bets.service';
import { FullmarketService } from '../_services/fullmarket.service';
import { IBetslipData } from '../_services/betslip-data.service';
import { ILoadEvent } from '../types/load-event';
import { IMarketDescription } from '../types/market-description';
declare var $: JQueryStatic;

@Component({
  selector: 'app-fullmarket',
  templateUrl: './fullmarket.component.html',
  styleUrls: ['./fullmarket.component.css'],
})
export class FullmarketComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  marketName = '';
  currentMatchData = [];
  volMultiplier = 1;
  betDelay = 0;

  mktId;
  matchid;
  bfId;
  mktbfId;
  sportId;
  tourID;

  fancyDataList = [];
  fancyData = [];

  runnerData?;
  tvUrl;

  sportsData;
  marketdata: any;
  oneClicked: string;
  pending_oneClickPlaceMOBet: boolean;
  betType: any;
  runnerName: any;
  selectionId: any;
  matchName: any;
  odds: any;
  mtid: any;
  fancyRate: any;
  fancyId: any;
  stake: any;
  profit: string;

  backBetSlipDataArray: any[] = [];
  layBetSlipDataArray: any[] = [];
  oneClickStake: any;
  selected_Stake_btn: any;
  backBetSlipList: any[];
  layBetSlipList: any[];
  yesBetSlipList: any[];
  noBetSlipList: any[];
  backBookBetSlipList: any[];
  layBookBetSlipList: any[];
  default_stake: any;

  stakeList = [
    { id: 1, stake: 500 },
    { id: 2, stake: 1000 },
    { id: 3, stake: 5000 },
    { id: 4, stake: 10000 },
    { id: 5, stake: 20000 },
    { id: 6, stake: 25000 },
    { id: 7, stake: 50000 },
    { id: 8, stake: 100000 },
  ];
  backTeenSlipDataArray: any[];
  ExpoMktid: any;
  bets: any;
  exposureBook: any;
  liabilityBack: number;
  liabilityBackBook: number;
  liabilityYes: number;
  liabilityLay: number;
  liabilityLayBook: number;
  liabilityNo: number;
  fancyBookCalled: any;
  placedButton: boolean;
  marketId: any;
  mktid: any;
  BookDataList: any = {};
  commentary;
  sessionSettings: { max: number; min: number };
  marketDescription: IMarketDescription;
  runnersMap = {};

  static fieldMap = {
    MarketId: 'marketId',
    IsMarketDataDelayed: 'isMarketDataDelayed',
    Status: 'status',
    IsInplay: 'isInplay',
    NumberOfRunners: 'numberOfRunners',
    NumberOfActiveRunners: 'numberOfActiveRunners',
    TotalMatched: 'totalMatched',
    Runners: 'runners',
    // selectionId: 'SelectionId',
    ExchangePrices: 'ex',
    AvailableToBack: 'availableToBack',
    AvailableToLay: 'availableToLay',
    Price: 'price',
    Size: 'size',
    LastPriceTraded: 'lastPriceTraded',
    SelectionId: 'selectionId',
    exchange: 'ex',
  };

  fancyType = {
    isStable: 0,
    isDiamond: 0,
    isScrap: 0,
  };
  sportsDataVal: boolean;

  oddsSub: Subscription;
  subSink = new Subscription();
  liabilities: number;
  exposureCalled: boolean = false;

  progressdata = {
    progress: 0,
  };
  fancyBetslipData = {};
  inputStakeYES = 0;
  inputStakeNO = 0;

  modalRef: BsModalRef;
  selectedFancyName: { marketName: any };
  fancyDatabookList: any[] = [];

  matchedData: IOpenBets[];
  constructor(
    private fullmarketService: FullmarketService,
    private activatedRoute: ActivatedRoute,
    private dataformatService: DataFormatService,
    private authService: AuthService,
    private betsService: BetsService,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.mktId = +params.marketId;
      this.matchid = +params.matchId;
      this.bfId = +params.bfId;
      this.mktbfId = +params.bfId;
      this.sportId = +params.sportid;
      this.tourID = +params.tourid;

      this.subSink.unsubscribe();
      this.subSink = new Subscription();

      this.subSink.add(() => {
        this.fullmarketService.closeConnection();
        this.fancyData = null;
        this.currentMatchData = null;
        this.marketdata = null;
        console.clear();
        console.log(this.oddsSub, this.fancyData);
      });

      let sportsDataSub = this.dataformatService.sportsData$
        .pipe(take(1))
        .subscribe((sportsData) => {
          if (sportsData) {
            console.log(sportsData);

            this.sportsData = sportsData;
            this.sportsDataVal = true;

            try {
              let racingSport = this.activatedRoute.snapshot.queryParamMap.get(
                'o'
              );
              if (eval(racingSport)) {
                this.getMarketData(true);
              } else {
                this.getMarketData();
              }
            } catch (e) {}
          }
        });
      this.subSink.add(sportsDataSub);
    });
    this.fullmarketService
      .loadEvent(this.matchid)
      .subscribe((res: GenericResponse<ILoadEvent>) => {
        if (res && res.errorCode === 0) {
          this.betDelay = res.result[0].betDelay;
          this.volMultiplier = res.result[0].volMultiplier
            ? res.result[0].volMultiplier
            : 1;
          this.sessionSettings = res.result[0].sessionSettings;
        }
      });
    this.subSink.add(
      interval(5000).subscribe(() => {
        this.fullmarketService
          .loadEvent(this.matchid)
          .subscribe((res: GenericResponse<ILoadEvent>) => {
            if (res && res.errorCode === 0) {
              this.betDelay = res.result[0].betDelay;
              this.volMultiplier = res.result[0].volMultiplier
                ? res.result[0].volMultiplier
                : 1;
              this.sessionSettings = res.result[0].sessionSettings;
            }
          });
      })
    );
    this.getOpenBets();
  }

  getOpenBets() {
    this.userService.openBets$.subscribe((bets) => {
      console.log(bets);
      this.matchedData = bets;
    });
  }

  getMarketData(racingGame?: boolean) {
    if (racingGame) {
      this.marketdata = this.sportsData[this.sportId].tournaments[
        this.tourID
      ].matches[this.matchid].markets.find(
        (market) => +market.id === this.mktId
      );
      this.fullmarketService
        .marketDescription(this.marketdata.id)
        .subscribe((data: IMarketDescription) => {
          this.marketDescription = data;
          console.log(data);
          data.eventTypes.eventNodes.marketNodes.runners.forEach((runner) => {
            this.runnersMap[runner.selectionId] = runner;
          });
          (<any[]>this.currentMatchData)?.forEach((market) => {
            market.runners.forEach((runner) => {
              runner.runnerName = this.runnersMap[runner.selectionId]
                .description.runnerName
                ? this.runnersMap[runner.selectionId].description.runnerName
                : '';
            });
          });
        });
    } else {
      this.marketdata = this.sportsData[this.sportId].tournaments[
        this.tourID
      ].matches[this.matchid];
    }
    console.log(this.marketdata);

    this.matchName = this.marketdata.name;
    this.getWebSocketData();
  }

  getExposure = function () {
    if (!!this.currentMatchData) {
      this.exposureBook = {};
      this.currentMatchData.forEach((market) => {
        market.runners.forEach((r) => {
          this.exposureBook[r.selectionId] = 0;
        });
        localStorage.setItem(
          'Exposure_' + market.marketId,
          JSON.stringify(this.exposureBook)
        );
      });
      if (this.authService.getLoggedIn()) {
        _.forEach(this.currentMatchData, (market) => {
          this.ExposureBook(market.marketId);
        });
      }
    }
    this.exposureCalled = true;
  };

  getWebSocketData() {
    this.oddsSub = this.fullmarketService
      .getWebSocketData(this.marketdata)
      .subscribe((message) => {
        if (
          message &&
          message.constructor !== Object &&
          !message.matchId &&
          message.length
        ) {
          message = Object.assign([], message)
            .filter((m) => !!m)
            .map((m) => {
              Object.keys(m).forEach((f) => {
                var newKey = FullmarketComponent.fieldMap[f]
                  ? FullmarketComponent.fieldMap[f]
                  : f;
                m[newKey] = m[f];
                FullmarketComponent.fieldMap[f] ? delete m[f] : '';
              });
              m.runners.map((runner) => {
                Object.keys(runner).forEach((r) => {
                  var runKey = FullmarketComponent.fieldMap[r]
                    ? FullmarketComponent.fieldMap[r]
                    : r;
                  runner[runKey] = runner[r];
                  FullmarketComponent.fieldMap[r] ? delete runner[r] : '';
                });
                Object.keys(runner.ex).forEach((k) => {
                  var blKey = FullmarketComponent.fieldMap[k]
                    ? FullmarketComponent.fieldMap[k]
                    : k;
                  runner.ex[blKey] = runner.ex[k];
                  FullmarketComponent.fieldMap[k] ? delete runner.ex[k] : '';
                });
                runner.ex.availableToBack.map((b) => {
                  Object.keys(b).forEach((k) => {
                    var blKey = FullmarketComponent.fieldMap[k]
                      ? FullmarketComponent.fieldMap[k]
                      : k;
                    b[blKey] = b[k];
                    FullmarketComponent.fieldMap[k] ? delete b[k] : '';
                  });
                  // if (b.size) {
                  //   if (b.size > 100) {
                  //     b.size = Math.round(b.size) * FullmarketComponent.volMultiplier;
                  //   } else {
                  //     b.size = +(b.size * FullmarketComponent.volMultiplier).toFixed(2);
                  //   }
                  // }
                });
                runner.ex.availableToLay.map((b) => {
                  Object.keys(b).forEach((k) => {
                    var blKey = FullmarketComponent.fieldMap[k]
                      ? FullmarketComponent.fieldMap[k]
                      : k;
                    b[blKey] = b[k];
                    FullmarketComponent.fieldMap[k] ? delete b[k] : '';
                  });
                  // if (b.size) {
                  //   if (b.size > 100) {
                  //     b.size = Math.round(b.size) * FullmarketComponent.volMultiplier;
                  //   } else {
                  //     b.size = +(b.size * FullmarketComponent.volMultiplier).toFixed(2);
                  //   }
                  // }
                });
                return m;
              });
              return m;
            })
            .sort((a, b) => {
              return a.marketName < b.marketName
                ? -1
                : a.marketName > b.marketName
                ? 1
                : 0;
            });

          this.currentMatchData = message.slice();
          if (!this.exposureCalled) {
            this.getExposure();
          }
          // this.matchDataHome[match.bfId] = message.slice();
        } else if (
          message &&
          message.constructor === Object &&
          this.marketdata?.racing
        ) {
          message.runners?.map((runner) => {
            runner.runnerName = this.runnersMap[runner.selectionId]
              ? this.runnersMap[runner.selectionId]
              : '';
            Object.keys(runner).forEach((r) => {
              var runKey = FullmarketComponent.fieldMap[r]
                ? FullmarketComponent.fieldMap[r]
                : r;
              runner[runKey] = runner[r];
              FullmarketComponent.fieldMap[r] ? delete runner[r] : '';
            });
            Object.keys(runner.ex).forEach((k) => {
              var blKey = FullmarketComponent.fieldMap[k]
                ? FullmarketComponent.fieldMap[k]
                : k;
              runner.ex[blKey] = runner.ex[k];
              FullmarketComponent.fieldMap[k] ? delete runner.ex[k] : '';
            });
            runner.ex.availableToBack?.map((b) => {
              Object.keys(b).forEach((k) => {
                var blKey = FullmarketComponent.fieldMap[k]
                  ? FullmarketComponent.fieldMap[k]
                  : k;
                b[blKey] = b[k];
                FullmarketComponent.fieldMap[k] ? delete b[k] : '';
              });
              // if (b.size) {
              //   if (b.size > 100) {
              //     b.size = Math.round(b.size) * FullmarketComponent.volMultiplier;
              //   } else {
              //     b.size = +(b.size * FullmarketComponent.volMultiplier).toFixed(2);
              //   }
              // }
            });
            runner.ex.availableToLay?.map((b) => {
              Object.keys(b).forEach((k) => {
                var blKey = FullmarketComponent.fieldMap[k]
                  ? FullmarketComponent.fieldMap[k]
                  : k;
                b[blKey] = b[k];
                FullmarketComponent.fieldMap[k] ? delete b[k] : '';
              });
              // if (b.size) {
              //   if (b.size > 100) {
              //     b.size = Math.round(b.size) * FullmarketComponent.volMultiplier;
              //   } else {
              //     b.size = +(b.size * FullmarketComponent.volMultiplier).toFixed(2);
              //   }
              // }
            });
            if (this.runnersMap && this.runnersMap[runner.selectionId]) {
              runner['description'] = this.runnersMap[
                runner.selectionId
              ]?.description;
              runner.runnerName = this.runnersMap[
                runner.selectionId
              ].description.runnerName;
            }

            return runner;
          });

          this.currentMatchData = Object.assign([], [message]);
          if (!this.exposureCalled) {
            this.getExposure();
          }
        } else if (message && message.Fancymarket) {
          if (
            message.Fancymarket &&
            message.Fancymarket.length &&
            'eventType' in message.Fancymarket[0]
          ) {
            message.Fancymarket = message.Fancymarket.filter((fancy) => {
              return (
                fancy.sort > 0 &&
                fancy.status !== 1 &&
                fancy.status !== 50 &&
                fancy.status !== 18
              );
            })
              .map((fancy) => {
                fancy.sort = +fancy.sort;
                return fancy;
              })
              .sort((a, b) => {
                return a.marketType < b.marketType ? -1 : a.sort - b.sort;
              });
            this.fancyType.isStable = 1;
            this.fancyType.isDiamond = 0;
            this.fancyType.isScrap = 0;
          } else {
            this.fancyType.isDiamond = 1;
            this.fancyType.isStable = 0;
            this.fancyType.isScrap = 0;
          }
          message.Fancymarket = message.Fancymarket.map((f) => {
            f = f.filter((f1) => !/[0-9]+.[1-9] (ball|over) run/.test(f1.nat));
            return f;
          });
          this.fancyData = Object.assign([], message).Fancymarket.map((f) => {
            f.map((f1) => {
              f1.srno = +f1.srno;
              return f1;
            });
            f.sort((a, b) => a.srno - b.srno);
            return f;
          });
          this.FancyData(this.fancyData);
        } else if (message && message.bookRates) {
          this.fancyType.isScrap = 1;
          this.fancyType.isDiamond = 0;
          this.fancyType.isStable = 0;
          this.fancyData = message;
          this.FancyData(this.fancyData);
        }
      });
    this.subSink.add(this.oddsSub);
  }

  betSlip(
    bfId,
    betType,
    betSlipIndex,
    runnerName,
    selectionId,
    matchName,
    odds,
    mtid,
    mktid,
    isInplay,
    fancyRate,
    fancyId,
    sportId,
    matchBfId
  ) {
    console.log(
      bfId,
      betType,
      betSlipIndex,
      runnerName,
      selectionId,
      matchName,
      odds,
      mtid,
      mktid,
      isInplay,
      fancyRate,
      fancyId,
      sportId,
      matchBfId
    );

    if (this.oneClicked != 'true') {
      $('#betslip_open').removeClass('close');
    }

    if (this.pending_oneClickPlaceMOBet == true) {
      return false;
    }
    if (betType == 'back' || betType == 'lay') {
      this.removeAllBetSlip('remove');
    } else {
      this.removeAllBetSlip();
    }

    $('#fancyBetMarketList .lay-1').removeClass('select');
    $('#fancyBetMarketList .back-1').removeClass('select');
    $('.matchOddTable .select').removeClass('select');

    // this.currRunnerIndex = runnerIndex;

    if (isInplay == 'false') {
      isInplay = 0;
    } else if (isInplay == 'true') {
      isInplay = 1;
    }

    this.oneClicked = localStorage.getItem('oneclick');

    // if (this.oneClicked !== 'true') {
    //   $('#fullSelection_' + runnerName + ' #' + betSlipIndex).addClass(
    //     'select'
    //   );
    // }

    this.betType = betType;
    this.runnerName = runnerName;
    this.selectionId = selectionId;
    this.matchName = matchName;
    this.odds = odds;
    this.mktId = mktid;
    this.mtid = mtid;
    this.fancyRate = fancyRate;
    this.fancyId = fancyId;
    if (this.default_stake == undefined) {
      this.default_stake = '';
    }
    this.stake = this.default_stake;
    if (this.stake != '' || this.stake != 0) {
      if (this.betType == 'back' || this.betType == 'lay') {
        this.profit = (
          (parseFloat(this.odds) - 1) *
          parseFloat(this.stake)
        ).toFixed();
      } else if (this.betType == 'yes' || this.betType == 'no') {
        this.profit = (
          (parseFloat(this.fancyRate) * parseFloat(this.stake)) /
          100
        ).toFixed(2);
      } else if (
        (this.betType == 'backBook' || this.betType == 'layBook') &&
        matchBfId == 1
      ) {
        this.profit = (
          (parseFloat(this.odds) / 100) *
          parseFloat(this.stake)
        ).toFixed(2);
      } else if (
        (this.betType == 'backBook' || this.betType == 'layBook') &&
        matchBfId == 2
      ) {
        this.profit = (
          (parseFloat(this.odds) - 1) *
          parseFloat(this.stake)
        ).toFixed(2);
      }
    } else {
      this.profit = '0.00';
    }

    // console.log(this.backBetSlipList)
    // console.log(this.layBetSlipList)

    if (betType == 'back' || betType == 'yes' || betType == 'backBook') {
      var backMatcheData = {
        matchname: matchName,
        selectionId: selectionId,
        isInplay: isInplay,
        bfId: bfId,
        booktype: matchBfId,
        marketId: this.mktId,
        matchId: this.mtid,
        backBetSlipData: [],
        yesBetSlipData: [],
        backBookBetSlipData: [],
      };
      this.backBetSlipDataArray.push(backMatcheData);
      this.backBetSlipDataArray = this.removeDuplicates(
        this.backBetSlipDataArray
      );
    } else if (betType == 'lay' || betType == 'no' || betType == 'layBook') {
      var layMatcheData = {
        matchname: matchName,
        selectionId: selectionId,
        isInplay: isInplay,
        bfId: bfId,
        booktype: matchBfId,
        marketId: this.mktId,
        matchId: this.mtid,
        layBetSlipData: [],
        noBetSlipData: [],
        layBookBetSlipData: [],
      };
      // console.log(layMatcheData);
      this.layBetSlipDataArray.push(layMatcheData);
      this.layBetSlipDataArray = this.removeDuplicates(
        this.layBetSlipDataArray
      );
    }

    console.log(this.backBetSlipDataArray);
    console.log(this.layBetSlipDataArray);

    var betSlipData;
    if (
      this.oneClicked == 'true' &&
      (this.betType == 'back' || this.betType == 'lay')
    ) {
      $('#betslip_open').addClass('close');
      $('#processingImg_OneClickBet').css('display', 'block');

      var oneClickMOData = {
        backlay: betType,
        sportId: sportId,
        matchBfId: matchBfId,
        bfId: bfId,
        marketId: this.mktId,
        matchId: this.mtid,
        runnerName: runnerName,
        selectionId: selectionId,
        matchName: matchName,
        odds: odds,
        stake: this.oneClickStake[this.selected_Stake_btn],
        // profit: this.profit
      };
      // console.log(oneClickMOData);
      this.oneClickPlaceMOBet(oneClickMOData);
      return false;
    }

    if (this.betType == 'back') {
      var backBetSlipExist = this.backBetSlipList.indexOf(betSlipIndex);

      if (backBetSlipExist == -1) {
        betSlipData = {
          backlay: betType,
          sportId: sportId,
          matchBfId: matchBfId,
          bfId: bfId,
          marketId: this.mktId,
          matchId: this.mtid,
          runnerName: runnerName,
          selectionId: selectionId,
          matchName: matchName,
          odds: odds,
          stake: this.stake,
          profit: this.profit,
        };
        // console.log(betSlipData);
        this.backBetSlipList.push(betSlipIndex);
        this.calcExposure(mktid, betSlipData);
        _.forEach(this.backBetSlipDataArray, (value, index) => {
          if (value.matchname == matchName) {
            this.backBetSlipDataArray[index].backBetSlipData.push(betSlipData);
            console.log(this.backBetSlipDataArray);
          }
        });
      }
      // this.backBetSlipVisible = true;
    } else if (this.betType == 'lay') {
      var layBetSlipExist = this.layBetSlipList.indexOf(betSlipIndex);
      if (layBetSlipExist == -1) {
        betSlipData = {
          backlay: betType,
          sportId: sportId,
          matchBfId: matchBfId,
          bfId: bfId,
          marketId: this.mktId,
          matchId: this.mtid,
          runnerName: runnerName,
          selectionId: selectionId,
          matchName: matchName,
          odds: odds,
          stake: this.stake,
          profit: this.profit,
        };
        // console.log(betSlipData);
        this.layBetSlipList.push(betSlipIndex);
        this.calcExposure(mktid, betSlipData);
        _.forEach(this.layBetSlipDataArray, (value, index) => {
          if (value.matchname == matchName) {
            this.layBetSlipDataArray[index].layBetSlipData.push(betSlipData);
            console.log(this.layBetSlipDataArray);
          }
        });
      }
    } else if (this.betType == 'yes') {
      var yesBetSlipExist = this.yesBetSlipList.indexOf(betSlipIndex);
      var betSlipData: any;
      if (yesBetSlipExist == -1) {
        betSlipData = {
          matchName: matchName,
          marketId: this.mktId,
          matchId: this.mtid,
          fancyId: fancyId,
          rate: fancyRate,
          runnerName: runnerName,
          selectionId: selectionId,
          score: odds,
          stake: this.stake,
          yesno: betType,
          profit: this.profit,
        };
        this.yesBetSlipList.push(betSlipIndex);

        _.forEach(this.backBetSlipDataArray, (value, index) => {
          if (value.matchname == matchName) {
            this.backBetSlipDataArray[index].yesBetSlipData.push(betSlipData);
            console.log(this.backBetSlipDataArray);
          }
        });
      }
    } else if (this.betType == 'no') {
      var noBetSlipExist = this.noBetSlipList.indexOf(betSlipIndex);

      if (noBetSlipExist == -1) {
        betSlipData = {
          matchName: matchName,
          marketId: this.mktId,
          matchId: this.mtid,
          fancyId: fancyId,
          rate: fancyRate,
          runnerName: runnerName,
          selectionId: selectionId,
          score: odds,
          stake: this.stake,
          yesno: betType,
          profit: this.profit,
        };
        this.noBetSlipList.push(betSlipIndex);
        _.forEach(this.layBetSlipDataArray, (value, index) => {
          if (value.matchname == matchName) {
            this.layBetSlipDataArray[index].noBetSlipData.push(betSlipData);
            console.log(this.layBetSlipDataArray);
          }
        });
      }
    } else if (this.betType == 'backBook') {
      var backBookBetSlipExist = this.backBookBetSlipList.indexOf(betSlipIndex);

      if (backBookBetSlipExist == -1) {
        var betBookSlipData = {
          matchName: matchName,
          backlay: betType,
          bookId: this.mktId,
          eventId: this.mtid,
          mktname: bfId,
          // info:",
          odds: odds,
          runnerId: fancyId,
          runnerName: runnerName,
          selectionId: selectionId,
          // source:",
          stake: this.stake,
          profit: this.profit,
        };

        this.backBookBetSlipList.push(betSlipIndex);

        _.forEach(this.backBetSlipDataArray, (value, index) => {
          if (value.matchname == matchName) {
            this.backBetSlipDataArray[index].backBookBetSlipData.push(
              betBookSlipData
            );
            console.log(this.backBetSlipDataArray);
          }
        });
      }
    } else if (this.betType == 'layBook') {
      var layBookBetSlipExist = this.layBookBetSlipList.indexOf(betSlipIndex);

      if (layBookBetSlipExist == -1) {
        var betBookSlipData = {
          matchName: matchName,
          backlay: betType,
          bookId: this.mktId,
          eventId: this.mtid,
          mktname: bfId,
          // info:",
          odds: odds,
          runnerId: fancyId,
          runnerName: runnerName,
          selectionId: selectionId,
          // source:",
          stake: this.stake,
          profit: this.profit,
        };

        this.layBookBetSlipList.push(betSlipIndex);

        _.forEach(this.layBetSlipDataArray, (value, index) => {
          if (value.matchname == matchName) {
            this.layBetSlipDataArray[index].layBookBetSlipData.push(
              betBookSlipData
            );
            console.log(this.layBetSlipDataArray);
          }
        });
      }
    }
    this.calculateLiability();
  }
  removeAllBetSlip(remove?: string) {
    this.backBetSlipDataArray = [];
    this.layBetSlipDataArray = [];

    this.backTeenSlipDataArray = [];

    this.backBetSlipList = [];
    this.layBetSlipList = [];

    this.yesBetSlipList = [];
    this.noBetSlipList = [];

    this.backBookBetSlipList = [];
    this.layBookBetSlipList = [];

    // this.finalStakeValue = null;
    this.calculateLiability();
    this.liabilities = 0.0;

    $('#fancyBetMarketList .lay-1').removeClass('select');
    $('#fancyBetMarketList .back-1').removeClass('select');
    $('.matchOddTable .select').removeClass('select');

    if (this.ExpoMktid != undefined) {
      this.bets.stake = 0;
      this.bets.profit = 0;
      this.calcExposure(this.ExpoMktid, this.bets, 'remove');
    }
    if (remove == undefined) {
      // console.log(this.ExpoMktid)
      if (this.ExpoMktid != undefined) {
        this.bets.stake = 0;
        this.bets.profit = 0;
      }
      this.calcExposure(this.ExpoMktid, this.bets, 'remove');
    }
  }
  removeDuplicates(betSlipArray: any[]): any {
    let obj = {},
      collection = [];

    _.each(betSlipArray, (value) => {
      if (!obj[value.matchname]) {
        obj[value.matchname];
        collection.push(value);
      }
    });
    return collection;
  }
  oneClickPlaceMOBet(oneClickMOData: {
    backlay: any;
    sportId: any;
    matchBfId: any;
    bfId: any;
    marketId: any;
    matchId: any;
    runnerName: any;
    selectionId: any;
    matchName: any;
    odds: any;
    stake: any;
  }) {
    throw new Error('Method not implemented.');
  }
  calcExposure(mktid: any, betSlipData: IBetslipData, remove?: string) {
    if (mktid == undefined) {
      return false;
    }
    try {
      this.exposureBook = JSON.parse(localStorage.getItem('Exposure_' + mktid));
    } catch (e) {}
    if (this.exposureBook == null) {
      return false;
    }
    this.ExpoMktid = mktid;
    this.bets = betSlipData;
    if (remove == 'remove') {
      Object.keys(this.exposureBook).forEach((item) => {
        //console.log("value - ",value,"item -",item)

        let value = this.exposureBook[item];
        $('#exposureAfter_' + item + '').css('display', 'none');
        $('#exposureAfter_' + item + '').text(parseFloat(value).toFixed(2));
        if ($('#exposureAfter_' + item + '').hasClass('to-lose'))
          $('#exposureAfter_' + item + '').removeClass('to-lose');
        if ($('#exposureAfter_' + item + '').hasClass('to-win'))
          $('#exposureAfter_' + item + '').removeClass('to-win');
        if (value >= 0) $('#exposureAfter_' + item + '').addClass('to-win');
        else $('#exposureAfter_' + item + '').addClass('to-lose');
      });
    } else {
      Object.keys(this.exposureBook).forEach((item, index) => {
        let value = this.exposureBook[item];
        let newValue = 0;
        let betStake = 0;
        if (this.bets.backlay == 'back') {
          if (item == this.bets.selectionId) {
            newValue = parseFloat(value) + parseFloat(this.bets.profit);
            this.exposureBook[item] = newValue;
          } else {
            if (this.bets.stake == '') {
              betStake = 0;
            } else {
              betStake = this.bets.stake;
            }
            newValue = parseFloat(value) - betStake;
            this.exposureBook[item] = newValue;
          }
        } else {
          if (item == this.bets.selectionId) {
            newValue = parseFloat(value) - parseFloat(this.bets.profit);
            this.exposureBook[item] = newValue;
          } else {
            if (this.bets.stake == '') {
              betStake = 0;
            } else {
              betStake = this.bets.stake;
            }
            newValue = parseFloat(value) + betStake;
            this.exposureBook[item] = newValue;
          }
        }
      });
      // localStorage.setItem('NewExposure_'+mktid,JSON.stringify(this.exposureBook))
      Object.keys(this.exposureBook).forEach((item) => {
        //console.log("value - ",value,"item -",item)

        let value = this.exposureBook[item];
        $('#exposureAfter_' + item + '').css('display', 'inline');
        $('#exposureAfter_' + item + '').text(parseFloat(value).toFixed(2));
        if ($('#exposureAfter_' + item + '').hasClass('to-lose'))
          $('#exposureAfter_' + item + '').removeClass('to-lose');
        if ($('#exposureAfter_' + item + '').hasClass('to-win'))
          $('#exposureAfter_' + item + '').removeClass('to-win');
        if (value >= 0)
          $('#exposureAfter_' + item + '').addClass('to-win actualPnl');
        else $('#exposureAfter_' + item + '').addClass('to-lose minusval');
      });
    }
  }
  calculateLiability() {
    this.liabilities = 0.0;
    this.liabilityBack = 0.0;
    this.liabilityBackBook = 0.0;

    this.liabilityYes = 0.0;
    this.liabilityLay = 0.0;
    this.liabilityLayBook = 0.0;

    this.liabilityNo = 0.0;
    this.stake = 0;

    _.forEach(this.backBetSlipDataArray, (item) => {
      _.forEach(item.backBetSlipData, (item) => {
        this.stake = item.stake;
        if (this.stake == '') {
          this.stake = 0;
        }
        this.liabilityBack = this.liabilityBack + parseFloat(this.stake);
      });
      _.forEach(item.yesBetSlipData, (item) => {
        this.stake = item.stake;
        if (this.stake == '') {
          this.stake = 0;
        }
        this.liabilityYes = this.liabilityYes + parseFloat(this.stake);
      });
      _.forEach(item.backBookBetSlipData, (item) => {
        this.stake = item.stake;
        if (this.stake == '') {
          this.stake = 0;
        }
        this.liabilityBackBook =
          this.liabilityBackBook + parseFloat(this.stake);
      });
    });
    _.forEach(this.layBetSlipDataArray, (item) => {
      _.forEach(item.layBetSlipData, (item) => {
        this.stake = item.stake;
        if (this.stake == '') {
          this.stake = 0;
        }
        this.liabilityLay = this.liabilityLay + parseFloat(this.stake);
      });
      _.forEach(item.noBetSlipData, (item) => {
        this.stake = item.stake;
        if (this.stake == '') {
          this.stake = 0;
        }
        this.liabilityNo = this.liabilityNo + parseFloat(this.stake);
      });
      _.forEach(item.layBookBetSlipData, (item) => {
        this.stake = item.stake;
        if (this.stake == '') {
          this.stake = 0;
        }
        this.liabilityLayBook = this.liabilityLayBook + parseFloat(this.stake);
      });
    });

    if (!!!this.liabilityBack) {
      this.liabilityBack = 0.0;
    }
    if (!!!this.liabilityYes) {
      this.liabilityYes = 0.0;
    }
    if (!!!this.liabilityLay) {
      this.liabilityLay = 0.0;
    }
    if (!!!this.liabilityNo) {
      this.liabilityNo = 0.0;
    }
    if (!!!this.liabilityBackBook) {
      this.liabilityBackBook = 0.0;
    }
    if (!!!this.liabilityLayBook) {
      this.liabilityLayBook = 0.0;
    }
    this.liabilities =
      this.liabilities +
      (this.liabilityBack +
        this.liabilityYes +
        this.liabilityBackBook +
        this.liabilityLay +
        this.liabilityNo +
        this.liabilityLayBook);
  }

  marketWiseData(markets) {
    var newMarkets = {};
    _.forEach(markets, (item, key) => {
      var runnerarray = [];
      _.forEach(item.runnerData1, (item, key) => {
        if (item.Key != undefined) {
          runnerarray.push(item.Value);
        } else {
          runnerarray.push(item);
        }
      });
      item.runnerData1 = runnerarray;
      item.runnerData = item.runnerData1;
      item['marketName'] = item.name;
      item['mktStatus'] = item.status.trim('');
      item['mktId'] = item.id;
      // item['mtBfId']=item.bfId;
      newMarkets[item.bfId] = item;
    });
    return newMarkets;
    // console.log(this.markets)
  }

  FancyData(matchfancyData) {
    //   console.log("- this.fancyData:", matchfancyData);
    this.mtid = this.matchid;
    // this.fancyData = matchfancyData;
    // this.bookmakingData = this.matchbookRates;
    // console.log(this.fancyBook)
    // this.getBMExposureBook();
    // this.top = 0;

    let fancyIds = [];
    if (!this.fancyBookCalled && this.fancyType.isDiamond === 1) {
      console.log(matchfancyData[0]);
      fancyIds = [];
      _.forEach(matchfancyData[0], (fancy) => {
        fancyIds.push('df_' + fancy.mid + '_' + fancy.sid);
      });
      this.getFancyExposure();
      this.fancyBookCalled = true;
    }
  }

  getFancyExposure() {
    this.fullmarketService
      .getFancyExposure(this.matchid)
      .subscribe((response: GenericResponse<any>) => {
        if (response.errorCode === 0) {
          _.forEach(response.result[0], (value, item) => {
            _.forEach(this.fancyData[0], (fancy) => {
              if (+item.split('_')[2] == fancy.sid) {
                $('#fancyBetBookBtn_' + fancy.sid).css('display', 'block');
                // if (value[0][1] == 0) {
                //   value[0][1] = 0;
                // } else {
                $('#fancyBetBookBtn_' + fancy.sid).css('display', 'block');
                if (value < 0) {
                  $('#fexp_' + fancy.sid)
                    .text('' + value.toFixed(2) + '')
                    .addClass('minusval');
                } else {
                  $('#fexp_' + fancy.sid)
                    .text('' + (value * -1).toFixed(2) + '')
                    .addClass('minusval');
                  $('#fancyBetBookBtn_' + fancy.sid).css('display', 'block');
                }
              }
              // }
            });
          });
        }
      });
  }

  stakeValue(stake, bet, booktype) {
    // console.log(stake)

    if (bet.backlay == 'back' || bet.backlay == 'lay') {
      var getStake = bet.stake;
      if (getStake == '') {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      bet.stake = totalStake;

      var odds = bet.odds;
      if (bet.gameType === '-12') {
        odds = parseFloat(odds) / 100 + 1;
      }
      var pnl = (parseFloat(odds) - 1) * totalStake;
      bet.profit = pnl.toFixed(2);
      this.calculateLiability();
      this.calcExposure(this.ExpoMktid, this.bets);
    }

    if (bet.backlay == 'backBook' || bet.backlay == 'layBook') {
      if (bet.booktype === 1) {
        var getStake = bet.stake;
        if (getStake == '') {
          getStake = 0;
        }
        var totalStake = parseInt(getStake) + parseInt(stake);
        bet.stake = totalStake;
        var pnl = (parseFloat(bet.odds) / 100) * totalStake;
        bet.profit = pnl.toFixed(2);
        this.calculateLiability();
      } else {
        var getStake = bet.stake;
        if (getStake == '') {
          getStake = 0;
        }
        var totalStake = parseInt(getStake) + parseInt(stake);
        bet.stake = totalStake;
        var pnl = (parseFloat(bet.odds) - 1) * totalStake;
        bet.profit = pnl.toFixed(2);
        this.calculateLiability();
      }
    }

    if (bet.yesno == 'yes' || bet.yesno == 'no') {
      var getStake = bet.stake;
      if (getStake == '') {
        getStake = 0;
      }
      var totalStake = parseInt(getStake) + parseInt(stake);
      bet.stake = totalStake;
      var pnl = (parseFloat(bet.rate) * totalStake) / 100;
      bet.profit = pnl.toFixed(2);
      this.calculateLiability();
    }
  }

  updateStake(bet, booktype) {
    if (bet.stake == '') {
      bet.stake = 0.0;
    }
    if (bet.backlay == 'back' || bet.backlay == 'lay') {
      var odds = bet.odds;
      console.log(bet);
      if (bet.gameType === '-12') {
        odds = parseFloat(odds) / 100 + 1;
      }
      let pnl = ((parseFloat(odds) - 1) * parseFloat(bet.stake)).toFixed(2);
      bet.profit = pnl;
      console.log(bet.profit, bet);
      this.calcExposure(this.ExpoMktid, this.bets);
    }
    if (bet.backLay == 'BACK' || bet.backLay == 'LAY') {
      var odds = bet.odds;
      if (bet.gameType === '-12') {
        odds = parseFloat(odds) / 100 + 1;
      }
      let pnl = (parseFloat(odds) - 1) * parseFloat(bet.stake);
      bet.profit = pnl.toFixed(2);
      $('#profitLiabilityBackUM_' + bet.id + '').text(pnl.toFixed(2));
      $('#profitLiabilityLayUM_' + bet.id + '').text(pnl.toFixed(2));
    }

    if (bet.backlay == 'backBook' || bet.backlay == 'layBook') {
      if (booktype === 1) {
        var odds = bet.odds;
        var pnl = (parseFloat(odds) / 100) * parseFloat(bet.stake);
        bet.profit = pnl.toFixed(2);
      } else {
        var odds = bet.odds;
        var pnl = (parseFloat(odds) - 1) * parseFloat(bet.stake);
        bet.profit = pnl.toFixed(2);
      }
    }

    if (bet.yesno == 'yes' || bet.yesno == 'no') {
      var rate = bet.rate;
      var pnl = (parseFloat(rate) * parseFloat(bet.stake)) / 100;
      bet.profit = pnl.toFixed(2);
    }
    console.log(bet);
    this.calculateLiability();
  }

  placeBet() {
    if (!this.authService.getLoggedIn()) {
      // Relogin()
      this.toastr.info('Token was expired. Please login to continue.');
      return false;
    }
    $('#loading_place_bet').css('display', 'block');

    this.placedButton = true;

    if (this.backBetSlipDataArray.length >= 1) {
      _.forEach(this.backBetSlipDataArray, (item, key) => {
        if (item.backBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');

          _.forEach(item.backBetSlipData, (item2) => {
            this.placeBetFunc(item2, key);
          });
        }
        if (item.yesBetSlipData.length >= 1) {
          // $('.spinner-text').html('Placing bet please wait...');
          _.forEach(item.yesBetSlipData, (item2) => {
            this.placeBetFancy(item2, key);
          });
        }
        if (item.backBookBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');

          _.forEach(item.backBookBetSlipData, (item2) => {
            this.placeBookBetFunc(item2, key);
          });
        }
      });
    }

    if (this.layBetSlipDataArray.length >= 1) {
      _.forEach(this.layBetSlipDataArray, (item, key) => {
        if (item.layBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');

          _.forEach(item.layBetSlipData, (item2) => {
            this.placeBetFunc(item2, key);
          });
        }
        if (item.noBetSlipData.length >= 1) {
          // $('.spinner-text').html('Placing bet please wait...');
          _.forEach(item.noBetSlipData, (item2) => {
            // console.log(item2)
            if (parseInt(item2.rate) == 0 || parseInt(item2.score) == 0) {
              // $interval.cancel(this.stopTime);
              return false;
            }
            this.placeBetFancy(item2, key);
          });
        }
        if (item.layBookBetSlipData.length >= 1) {
          // $('#loading_place_bet').css('display','block');

          _.forEach(item.layBookBetSlipData, (item2) => {
            this.placeBookBetFunc(item2, key);
          });
        }
      });
    }

    if (this.backTeenSlipDataArray.length >= 1) {
      _.forEach(this.backTeenSlipDataArray, (item, key) => {
        if (item.cards) {
          if (item.cards.length < 3) {
            this.toastr.error('Please Select Atleast 3 Cards');
            $('#loading_place_bet').css('display', 'none');
          } else {
            this.placeTpBet(item, key);
          }
        } else {
          this.placeTpBet(item, key);
        }
      });
    }
  }

  fancybetSlip = function (
    betType,
    betSlipIndex,
    runnerName,
    selectionId,
    matchName,
    odds,
    mktid,
    mtid,
    fancyRate,
    fancyId,
    sportId,
    matchBfId,
    bfId
  ) {
    console.log(
      betType,
      ',',
      betSlipIndex,
      ',',
      runnerName,
      ',',
      selectionId,
      ',',
      matchName,
      ',',
      odds,
      ',',
      mktid,
      ',',
      mtid,
      ',',
      ',',
      fancyRate,
      ',',
      fancyId,
      ',',
      sportId,
      ',',
      matchBfId
    );
    this.Odds = parseInt(odds).toFixed(0);
    this.fancyRate = parseInt(fancyRate).toFixed(0);
    // console.log(this.Odds,this.fancyRate);
    this.oneClicked = localStorage.getItem('oneclick');
    $('#fancyBetMarketList .lay-1').removeClass('select');
    $('#fancyBetMarketList .back-1').removeClass('select');
    $('#fancyBetMarketList .fancy-quick-tr').css('display', 'none');

    $('#inputStake_NO_' + fancyId + '').val('');
    $('#inputStake_YES_' + fancyId + '').val('');
    $('#placeBet_YES_' + fancyId + '').addClass('disable');
    $('#placeBet_NO_' + fancyId + '').addClass('disable');
    $('#after .to-win').css('display', 'inline');

    if (this.oneClicked == null) {
      if (betType == 'no') {
        console.log('#lay_' + fancyId);
        $('#lay_' + fancyId).addClass('select');
        $('#fancyBetBoard_' + fancyId + '_lay').css('display', 'block');
      } else {
        console.log('#back_' + fancyId);
        $('#back_' + fancyId).addClass('select');
        $('#fancyBetBoard_' + fancyId + '_back').css('display', 'block');
      }
    } else {
      this.oneclickbetdata = {
        fancyId: fancyId,
        matchBfId: matchBfId,
        matchId: mtid,
        marketId: mktid,
        rate: this.fancyRate,
        runnerName: runnerName,
        score: this.Odds,
        stake: this.oneClickStake[this.selected_Stake_btn],
        yesno: betType,
        mktBfId: bfId,
      };
      this.OneclickFancyBet(this.oneclickbetdata);
    }
  };

  fancyStakechange(stake, fancyId) {
    console.log(stake);
    if (stake == null || stake == undefined) {
      $('#placeBet_YES_' + fancyId + '').addClass('disable');
    } else {
      $('#placeBet_YES_' + fancyId + '').removeClass('disable');
    }
    if (stake == null || stake == undefined) {
      $('#placeBet_NO_' + fancyId + '').addClass('disable');
    } else {
      $('#placeBet_NO_' + fancyId + '').removeClass('disable');
    }
  }

  placeFancyBet(
    betType,
    betSlipIndex,
    runnerName,
    selectionId,
    matchName,
    fancyRate,
    mktid,
    mtid,
    odds,
    fancyId,
    sportId,
    matchBfId,
    bfId
  ) {
    // console.log(betType, betSlipIndex, runnerName, matchName, odds, mktid, mtid,isInplay, fancyRate, fancyId,sportId,matchBfId,bfId);
    if (!this.authService.getLoggedIn()) {
      // Relogin()
      this.toastr.info('Token was expired. Please login to continue.');
      return false;
    }
    this.odds = parseInt(odds).toFixed(0);
    this.fancyRate = parseInt(fancyRate).toFixed(0);
    var stake;
    if (betType == 'no') {
      stake = $('#inputStake_NO_' + fancyId + '').val();
      $('#placeBet_NO_' + fancyId + '').attr('disabled');
    } else {
      stake = $('#inputStake_YES_' + fancyId + '').val();
      $('#placeBet_YES_' + fancyId + '').attr('disabled');
    }

    // Odds is rate and runs is score
    let betData1 = {
      marketId: mktid,
      odds: +odds,
      runs: +fancyRate,
      stake: +stake,
      betType: betType,
      gameType: 'fancy',
    };
    // $('#fancyBetBar_' + fancyId + '').css('display', 'table-row');
    $('#fancyBetMarketList .fancy-overly-singleline').css('display', 'block');

    // $timeout(function () {
    this.betsService.placeBet(betData1).subscribe(
      (response: GenericResponse<any>) => {
        this.removefancybetslip(fancyId, betType);
        $('#fancyBetMarketList .fancy-overly-singleline').css(
          'display',
          'none'
        );
        if (response.errorCode == 0) {
          this.toastr.success(response.errorDescription);
          this.userService.getBalance();
          this.userService.getBets();
          this.getFancyExposure();
          setTimeout(() => {
            this.userService.getBalance();
            this.userService.getBets();
            this.getFancyExposure();
          }, 1500);
          $('#fancyBetBar_' + fancyId + '').css('display', 'none');
          $('#betslip_open').addClass('close');
          $('#header_' + fancyId).text(response.errorDescription);
          $('#fancyBetMessage_' + fancyId + ' .quick_bet-message').removeClass(
            'error'
          );
          $('#fancyBetMessage_' + fancyId + ' .quick_bet-message').addClass(
            'success'
          );
          $('#fancyBetMessage_' + fancyId + '').css('display', 'table-row');
          setTimeout(() => {
            $(
              '#fancyBetMessage_' + fancyId + ' .quick_bet-message'
            ).removeClass('success');
            $('#fancyBetMessage_' + fancyId + '').css('display', 'none');
          }, 3000);
          $('#placeBet_YES_' + fancyId + '').removeAttr('disabled');
          $('#placeBet_NO_' + fancyId + '').removeAttr('disabled');
        } else {
          this.toastr.error(response.errorDescription);
          // $('#header_' + fancyId).text(response.errorDescription);
          $('#fancyBetBar_' + fancyId + '').css('display', 'none');
          $('#fancyBetMessage_' + fancyId + ' .quick_bet-message').removeClass(
            'success'
          );
          $('#fancyBetMessage_' + fancyId + ' .quick_bet-message').addClass(
            'error'
          );
          setTimeout(() => {
            $(
              '#fancyBetMessage_' + fancyId + ' .quick_bet-message'
            ).removeClass('error');
            $('#fancyBetMessage_' + fancyId + '').css('display', 'none');
          }, 3000);
          $('#fancyBetMessage_' + fancyId + '').css('display', 'table-row');
          $('#placeBet_YES_' + fancyId + '').removeAttr('disabled');
          $('#placeBet_NO_' + fancyId + '').removeAttr('disabled');
        }
      },
      function myError(error) {
        if (error.status == 401) {
          // $.removeCookie("authtoken");
          // window.location.href="index.html"
        }
        if (error.status == 400) {
          this.toastr.error('Unable to Place Bet!');
        }
      }
    );
    // }, 3000);
  }

  placeBetFunc(betData, index) {
    // $('.loading').css('display','block');
    // betData["source"] = 'web';

    // betData["info"] = 'os:' + jscd.os + ', os_version:' + jscd.osVersion + ', browser:' + jscd.browser + ', browser_version:' + jscd.browserMajorVersion;

    if (betData.backlay == 'back') {
      var i = this.backBetSlipDataArray[index].backBetSlipData.indexOf(betData);
      var slipIndex = this.backBetSlipList.indexOf(
        betData.runnerName + i + 'back'
      );
      if (i != -1) {
        this.backBetSlipDataArray[index].backBetSlipData.splice(i, 1);
        this.backBetSlipList.splice(slipIndex, 1);
      }
      if (
        this.backBetSlipDataArray[index].backBetSlipData.length == 0 &&
        this.backBetSlipDataArray[index].backBookBetSlipData.length == 0 &&
        this.backBetSlipDataArray[index].yesBetSlipData.length == 0
      ) {
        this.backBetSlipDataArray.splice(index, 1);
      }
    } else {
      var i = this.layBetSlipDataArray[index].layBetSlipData.indexOf(betData);
      var slipIndex = this.layBetSlipList.indexOf(
        betData.runnerName + i + 'lay'
      );
      if (i != -1) {
        this.layBetSlipDataArray[index].layBetSlipData.splice(i, 1);
        this.layBetSlipList.splice(slipIndex, 1);
      }
      if (
        this.layBetSlipDataArray[index].layBetSlipData.length == 0 &&
        this.layBetSlipDataArray[index].layBookBetSlipData.length == 0 &&
        this.layBetSlipDataArray[index].noBetSlipData.length == 0
      ) {
        this.layBetSlipDataArray.splice(index, 1);
      }
    }
    let betData1 = {
      marketId: betData.marketId,
      selId: betData.selectionId,
      odds: betData.odds,
      stake: +betData.stake,
      betType: betData.backlay,
      gameType: 'exchange',
    };
    console.log(betData1);
    $('#placebet_btn').removeClass('disable');
    $('#placebet_btn').addClass('disable');
    $('#placebet_btn').prop('disabled', true);
    this.betsService.placeBet(betData1).subscribe(
      (response: GenericResponse<any>) => {
        this.placedButton = false;
        if (response.errorCode == 0) {
          // this.$emit("callExp", {})

          // if($location.path()=== "/multi-market"){
          //     this.$emit("callMultiMarketExp", {})
          // }

          this.toastr.success(response.errorDescription);
          $('#loading_place_bet').css('display', 'none');
          // $("#betslip_open").addClass("close");
          this.userService.getBalance();
          this.userService.getBets();
          setTimeout(() => {
            this.userService.getBalance();
            this.userService.getBets();
            this.ExposureBook(betData.bfId || betData.marketId);
          }, 1000);
          $('#placebet_btn').removeClass('disable');
          $('#placebet_btn').prop('disabled', false);
          $('.matchOddTable .select').removeClass('select');
          this.removeAllBetSlip();
          // this.getMultiExposureBook()
        } else {
          this.removeAllBetSlip();
          $('#loading_place_bet').css('display', 'none');
          $('#placebet_btn').removeClass('disable');
          $('#placebet_btn').prop('disabled', false);
          $('.matchOddTable .select').removeClass('select');

          this.toastr.error(response.errorDescription);
        }
      },
      function myError(error) {
        $('#placebet_btn').removeClass('disable');
        if (error.status == 401) {
          // $.removeCookie("authtoken");
          // window.location.href="index.html"
        }
      }
    );
  }

  placeTpBet(betData, index) {
    var betData1 = {
      betType: betData.backlay,
      gameType: betData.matchname,
      selId: betData.runnerId,
      round: +betData.gameId.split('.')[1],
      odds: +betData.odds,
      stake: +betData.stake,
    };
    console.log(betData1);
    this.betsService.placeTPBet(betData1).subscribe(
      function mySuccess(response: GenericResponse<any>) {
        this.placedButton = false;
        if (response.errorCode == 0) {
          // this.$emit("callExp", {})

          // if($location.path()=== "/multi-market"){
          //     this.$emit("callMultiMarketExp", {})
          // }

          this.toastr.success(response.errorDescription);
          $('#loading_place_bet').css('display', 'none');
          // $("#betslip_open").addClass("close");
          this.userService.getBalance();
          this.userService.getBets();
          this.ExposureBookTeenPatti(
            betData1.gameType,
            betData1.round,
            betData1.selId
          );

          setTimeout(() => {
            this.userService.getBalance();
            this.userService.getBets();
            this.ExposureBookTeenPatti(
              betData1.gameType,
              betData1.round,
              betData1.selId
            );
          }, 1000);
          $('#placebet_btn').removeClass('disable');
          $('#placebet_btn').prop('disabled', false);
          this.removeAllBetSlip();
          // this.getMultiExposureBook()
          // if (
          //   betData.gameType == 1 ||
          //   betData.gameType == 2 ||
          //   betData.gameType == 6
          // ) {
          //   this.ExposureBookTeenPatti(betData.gameId);
          // }
          // if (betData.gameType == 5) {
          //   this.ExposureBookLucky7(betData.gameId);
          // }
          // if (betData.gameType == 7) {
          //   this.AndarBaharExposureBook(betData.gameId);
          // }
        } else {
          this.removeAllBetSlip();
          $('#loading_place_bet').css('display', 'none');
          $('#placebet_btn').removeClass('disable');
          $('#placebet_btn').prop('disabled', false);

          this.toastr.error(response.errorDescription);
        }
      },
      function myError(error) {
        $('#placebet_btn').removeClass('disable');
        if (error.status == 401) {
          // $.removeCookie("authtoken");
          // window.location.href="index.html"
        }
      }
    );
  }

  placeBetFancy(betData, index) {
    if (!this.authService.getLoggedIn()) {
      // Relogin()
      this.toastr.info('Token was expired. Please login to continue.');
      return false;
    }
    // $('.loading').css('display','block');
    // betData["source"] = 'web';
    // betData["info"] = 'os:' + jscd.os + ', os_version:' + jscd.osVersion + ', browser:' + jscd.browser + ', browser_version:' + jscd.browserMajorVersion;

    let betData1 = {
      marketId: betData.marketId,
      selId: betData.selectionId,
      odds: betData.odds,
      stake: +betData.stake,
      betType: betData.backlay,
      gameType: 'fancy',
    };
    console.log(betData1);
    this.betsService.placeBet(betData1).subscribe(
      function mySuccess(response: GenericResponse<any>) {
        this.placedButton = false;
        if (response.errorCode == 0) {
          this.$emit('callFancyExp', {});

          if (betData.yesno == 'yes') {
            // console.log(betData)
            var i = this.backBetSlipDataArray[index].yesBetSlipData.indexOf(
              betData
            );
            var slipIndex = this.yesBetSlipList.indexOf(
              betData.runnerName + i + 'yes'
            );
            if (i != -1) {
              this.backBetSlipDataArray[index].yesBetSlipData.splice(i, 1);
              this.yesBetSlipList.splice(slipIndex, 1);
            }
            if (
              this.backBetSlipDataArray[index].backBetSlipData.length == 0 &&
              this.backBetSlipDataArray[index].backBookBetSlipData.length ==
                0 &&
              this.backBetSlipDataArray[index].yesBetSlipData.length == 0
            ) {
              this.backBetSlipDataArray.splice(index, 1);
            }
          } else {
            var i = this.layBetSlipDataArray[index].noBetSlipData.indexOf(
              betData
            );
            var slipIndex = this.noBetSlipList.indexOf(
              betData.runnerName + i + 'no'
            );

            if (i != -1) {
              this.layBetSlipDataArray[index].noBetSlipData.splice(i, 1);
              this.noBetSlipList.splice(slipIndex, 1);
            }
            if (
              this.layBetSlipDataArray[index].layBetSlipData.length == 0 &&
              this.layBetSlipDataArray[index].layBookBetSlipData.length == 0 &&
              this.layBetSlipDataArray[index].noBetSlipData.length == 0
            ) {
              this.layBetSlipDataArray.splice(index, 1);
            }
          }
          this.toastr.success(response.errorDescription);
          $('#loading_place_bet').css('display', 'none');
          this.userService.getBalance();
          this.userService.getBets();
          // $("#betslip_open").addClass("close");
        } else {
          $('#loading_place_bet').css('display', 'none');

          this.toastr.error(response.errorDescription);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          // $.removeCookie("authtoken");
          // window.location.href="index.html"
        }
      }
    );
  }

  placeBookBetFunc(betData, index) {
    // $('.loading').css('display','block');
    // betData["source"] = 'web';

    // betData["info"] = 'os:' + jscd.os + ', os_version:' + jscd.osVersion + ', browser:' + jscd.browser + ', browser_version:' + jscd.browserMajorVersion;
    if (betData.backlay == 'backBook') {
      var i = this.backBetSlipDataArray[index].backBookBetSlipData.indexOf(
        betData
      );
      var slipIndex = this.backBookBetSlipList.indexOf(
        betData.runnerName + i + 'backBook'
      );
      if (i != -1) {
        this.backBetSlipDataArray[index].backBookBetSlipData.splice(i, 1);
        this.backBookBetSlipList.splice(slipIndex, 1);
      }
      if (
        this.backBetSlipDataArray[index].backBetSlipData.length == 0 &&
        this.backBetSlipDataArray[index].backBookBetSlipData.length == 0 &&
        this.backBetSlipDataArray[index].yesBetSlipData.length == 0
      ) {
        this.backBetSlipDataArray.splice(index, 1);
      }
    } else {
      var i = this.layBetSlipDataArray[index].layBookBetSlipData.indexOf(
        betData
      );
      var slipIndex = this.layBookBetSlipList.indexOf(
        betData.runnerName + i + 'layBook'
      );
      if (i != -1) {
        this.layBetSlipDataArray[index].layBookBetSlipData.splice(i, 1);
        this.layBookBetSlipList.splice(slipIndex, 1);
      }
      if (
        this.layBetSlipDataArray[index].layBetSlipData.length == 0 &&
        this.layBetSlipDataArray[index].layBookBetSlipData.length == 0 &&
        this.layBetSlipDataArray[index].noBetSlipData.length == 0
      ) {
        this.layBetSlipDataArray.splice(index, 1);
      }
    }
    if (betData.backlay == 'backBook') {
      betData.betType = 'back';
    } else {
      betData.betType = 'lay';
    }

    let betData1 = {
      marketId: betData.marketId,
      selId: betData.selectionId,
      odds: betData.odds,
      stake: +betData.stake,
      betType: betData.backlay,
    };
    console.log(betData1);

    // console.log(betData)
    $('#placebet_btn').removeClass('disable');
    $('#placebet_btn').addClass('disable');
    $('#placebet_btn').prop('disabled', true);
    this.betsService.placeBet(betData1).subscribe(
      function mySuccess(response: GenericResponse<any>) {
        this.placedButton = false;
        if (response.errorCode == 0) {
          // this.$emit("callBMExp", {})
          this.getBMExposureBook(betData.bookId);
          if (betData.backlay == 'back') {
            betData.backlay = 'backBook';
          } else {
            betData.backlay = 'layBook';
          }

          this.toastr.success(response.errorDescription);
          $('#loading_place_bet').css('display', 'none');
          $('#placebet_btn').prop('disabled', false);
          $('#placebet_btn').removeClass('disable');
          this.userService.getBalance();
          this.userService.getBets();
          // $("#betslip_open").addClass("close");
        } else {
          $('#loading_place_bet').css('display', 'none');
          $('#placebet_btn').prop('disabled', false);
          $('#placebet_btn').removeClass('disable');
          this.toastr.error(response.errorDescription);
        }
      },
      function myError(error) {
        if (error.status == 401) {
          // $.removeCookie("authtoken");
          // window.location.href="index.html"
        }
      }
    );
  }

  removefancybetslip(betslipid, betstype) {
    if (betstype == 'no') {
      $('#fancyBetBoard_' + betslipid + '_lay').css('display', 'none');
      $('#fancyBetMarketList .lay-1').removeClass('select');
    } else {
      $('#fancyBetMarketList .back-1').removeClass('select');
      $('#fancyBetBoard_' + betslipid + '_back').css('display', 'none');
    }
    if (betstype == '') {
      $('#fancyBetMessage_' + betslipid).css('display', 'none');
      // $("#fancyBetMarketList .back-1").removeClass("select");
      //    $("#fancyBetBoard_"+betslipid+"_back").css("display","none");
      //    $("#fancyBetMarketList .lay-1").removeClass("select");
      //    $("#fancyBetBoard_"+betslipid+"_lay").css("display","none");
    }
  }

  ExposureBook(mktid) {
    // this.BookDataList=[]
    if (this.marketId == undefined) {
      this.mktid = mktid;
    } else {
      this.mktid = this.bfId;
    }

    this.userService.listBooks(mktid).subscribe(
      (response: GenericResponse<any>) => {
        if (response.errorCode === 0) {
          console.log(response);
          this.BookDataList = response.result[0];
          // console.log(this.BookDataList)

          // localStorage.setItem('exposureData',JSON.stringify(this.BookDataList))

          if (this.BookDataList) {
            _.forEach(Object.keys(this.BookDataList), (item, index) => {
              var mktexposure = +this.BookDataList[item];
              if (mktexposure == 0) {
                mktexposure = null;
              }
              // if (item.Value > 0) {
              //     $('#exposure_' + runName).text(mktexposure).css('color', 'green');
              // } else {
              //     $('#exposure_' + runName).text(mktexposure).css('color', 'red');
              // }
              if (mktexposure > 0) {
                $('#exposure_' + item).removeClass('minusval');
                $('#exposure_' + item)
                  .text(mktexposure.toFixed(2))
                  .addClass('proft');
              } else {
                $('#exposure_' + item).removeClass('profit');
                $('#exposure_' + item)
                  .text(mktexposure === 0 ? '0' : mktexposure.toFixed(2))
                  .addClass('minusval');
              }
            });
            localStorage.setItem(
              'Exposure_' + mktid,
              JSON.stringify(response.result[0])
            );
          }
        }
        //this.Value1=this.Value[0];
      },
      function myError(error) {
        if (error.status == 401) {
          // $.removeCookie("authtoken");
          // window.location.href="index.html"
        }
      }
    );
  }

  selectStake(stake, fancyId, selectiontype) {
    if (selectiontype == 'no') {
      this.inputStakeNO = stake;
      $('#inputStake_NO_' + fancyId).val(stake);
      $('#placeBet_NO_' + fancyId + '').removeClass('disable');
    } else {
      this.inputStakeYES = stake;
      $('#inputStake_YES_' + fancyId).val(stake);
      $('#placeBet_YES_' + fancyId + '').removeClass('disable');
    }
  }

  GetFancyBook(template: TemplateRef<any>, marketName, marketId, fancyId) {
    this.selectedFancyName = marketName;
    this.fancyDatabookList = [];
    this.fullmarketService
      .getFancyBook(marketId, fancyId)
      .subscribe((books: GenericResponse<any>) => {
        console.log(books);
        let matrix = (<string>Object.values(books.result[0])[0])
          .replace(/\{|\}/g, '')
          .split(',')
          .map((f) => {
            return f.split(':').map((b: any) => (b = +b));
          });
        for (let i = 0; i < matrix.length; i++) {
          let run = matrix[i][0];
          let row = [];
          if (i === 0) {
            row[0] = run + ' and below';
          } else if (i === matrix.length - 1) {
            row[0] = matrix[i - 1][0] + 1 + ' and above';
          } else if (matrix[i - 1][0] + 1 === matrix[i][0]) {
            row[0] = matrix[i][0];
          } else {
            row[0] = matrix[i - 1][0] + 1 + '-' + matrix[i][0];
          }
          row[1] = matrix[i][1];
          this.fancyDatabookList.push(row);
        }
      });
    this.modalRef = this.modalService.show(template);
  }

  trackByFn(item, index) {
    return item.sid;
  }

  trackByFnMO(item, index) {
    return item.marketId;
  }

  trackByFnRunner(item, index) {
    return item.selectionId;
  }

  trackByCon(item: IOpenBets, index) {
    return item.consolidateId;
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
