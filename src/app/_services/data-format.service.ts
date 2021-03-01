import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import * as _ from 'underscore';
import { IRaces } from '../shared/types/races';

@Injectable({
  providedIn: 'root',
})
export class DataFormatService {
  _sportsDataSub = new ReplaySubject<any>(1);
  sportsData$ = this._sportsDataSub.asObservable();

  _sportsListSub = new BehaviorSubject<any>(null);
  sportsList$ = this._sportsListSub.asObservable();

  private _otherGamesSub = new BehaviorSubject<IRaces[]>(null);
  otherGames$ = this._otherGamesSub.asObservable();

  events: any[];
  sport: any;
  static sportsData = {};
  static inPlayEventsCount = {};
  otherGames = {};
  static EventTypeIds = {
    cricket: {
      id: 2,
      bfId: 4,
      title: 'Cricket',
    },
    soccer: {
      id: 3,
      bfId: 1,
      title: 'Soccer',
    },
    tennis: {
      id: 1,
      bfId: 2,
      title: 'Tennis',
    },
    horseRacing: {
      id: 4,
      bfId: 7,
      title: 'Horse Racing',
    },
    greyhoundRacing: {
      id: 5,
      bfId: 4339,
      title: 'Greyhound Racing',
    },
  };

  static sportIdMap: {
    [key: number]: {
      id: number;
      bfId: number;
      title: string;
    };
  } = {
    7: {
      id: 4,
      bfId: 7,
      title: 'Horse Racing',
    },
    4339: {
      id: 5,
      bfId: 4339,
      title: 'Greyhound Racing',
    },
  };

  constructor() {}

  static findKeysfromArr(arr, fieldName) {
    var keys = [];
    _.forEach(arr, function (it, index) {
      let key = it[fieldName];
      if (keys.findIndex((k) => k === key) < 0) {
        keys.push(key);
      }
    });
    return keys;
  }

  static findDatafromArr(arr, fieldName, filterTerm) {
    return arr.filter(
      (it) => it[fieldName].toString() === filterTerm.toString()
    );
  }

  getSportsData(gamesList: any[]) {
    var events = gamesList;
    this.events = gamesList;
    events = gamesList.filter((e) => parseInt(e.eventTypeId, 10) > 0);

    var result = {
      _allinfo: null,
      _multimkt: null,
      _userAvgmatchedBets: null,
      _userMatchedBets: null,
      _userUnMatchedBets: null,
      description: {
        result: null,
        status: 'Failed',
      },
      news: null,
    };
    var sportsData = [];
    var sportsName = DataFormatService.findKeysfromArr(
      this.events,
      'sportsName'
    );
    _.forEach(sportsName, function (sportName, index) {
      var sport = {
        id: DataFormatService.EventTypeIds[sportName].id,
        img: null,
        bfId: DataFormatService.EventTypeIds[sportName].bfId,
        tournaments: [],
        name: DataFormatService.EventTypeIds[sportName].title,
      };
      var competitionIds = [];
      _.forEach(events, function (it, index) {
        if (it.sportsName === sportName) {
          let key = it['competitionId'];
          if (competitionIds.findIndex((k) => k === key) < 0) {
            competitionIds.push(key);
          }
        }
      });

      _.forEach(competitionIds, function (competitionId, index2) {
        var competition = DataFormatService.findDatafromArr(
          events,
          'competitionId',
          competitionId
        )[0];
        var tournament = {
          id: index2,
          bfId: competition.competitionId,
          name: competition.competitionName,
          matches: [],
        };
        _.forEach(events, function (event, index3) {
          if (event.competitionId === competitionId) {
            var match = {
              bfId: event.eventId,
              inPlay: event.isInPlay,
              startDate: event.time,
              name: event.eventName,
              port: event.port,
              id: event.id,
              status: event.status === 0 ? 'OPEN' : 'CLOSE',
              tv: event.tv,
              isFancy: event.isFancy,
              activeStatus: event.isFancy,
              totalMatched: event.totalMatched,
              tvPid: event.tvPid,
              tvMapid: event.tvMapid,
              bet: event.bet,
              usersOnline: event.usersOnline,
              noOfBets: event.noOfBets,
              session: event.session,
              unmatched: event.unmatched,
              markets: [],
              _avgmatchedBets: null,
              _fancyBets: null,
              _matchedBets: null,
              _unMatchedBets: null,
              bookRates: null,
              commentary: null,
              data: null,
              dataMode: 1,
              displayApplication: 1,
            };
            _.forEach(event.markets, function (market, index4) {
              match.markets.push({
                name: market.marketName,
                id: market.gameId,
                bfId: market.marketId,
                betDelay: market.betDelay,
                runnerData: {
                  runner1Name: market.runners[0],
                  runner2Name: market.runners[1],
                },
                status: market.open === 1 ? 'OPEN' : '',
              });
            });
            tournament.matches.push(match);
          }
        });
        sport.tournaments.push(tournament);
      });
      sportsData.push(sport);
    });
    result['sportsData'] = sportsData;
    var home = result;
    this.sport = this.sportlistwise();
    this.homeSignalrFormat(sportsData);
    this._sportsDataSub.next(DataFormatService.sportsData);
    // console.log($rootScope.sportsData, $scope.highlightsData);
  }

  getOtherGames(otherGames: IRaces[]) {
    let sportIds = DataFormatService.findKeysfromArr(otherGames, 'eventTypeId');
    _.forEach(sportIds, (sportId) => {
      let sport = {
        id: DataFormatService.sportIdMap[sportId].id,
        name: DataFormatService.sportIdMap[sportId].title,
        bfId: DataFormatService.sportIdMap[sportId].bfId,
        tournaments: [],
      };

      let tourIds = [];
      _.forEach(otherGames, (race) => {
        if (race.eventTypeId === sportId) {
          let key = race.countryCode;
          if (tourIds.findIndex((k) => k === key) < 0) {
            tourIds.push(key);
          }
        }
      });

      _.forEach(tourIds, (tourId, index) => {
        let meeting = DataFormatService.findDatafromArr(
          otherGames,
          'countryCode',
          tourId
        )[0];
        let tournament = {
          id: index + 1,
          bfId: index + 1,
          name: meeting.countryCode,
          matches: [],
        };

        _.forEach(otherGames, (meeting) => {
          if (meeting.countryCode === tourId) {
            let match = {
              id: meeting.meetingId,
              name: meeting.venue,
              bfId: meeting.meetingId,
              markets: [],
            };
            _.forEach(meeting.races, (race) => {
              let market = {
                name: race.marketName,
                id: race.marketId,
                bfId: race.marketId,
                racing: true,
                ...race,
              };
              match.markets.push(market);
            });
            tournament.matches.push(match);
          }
        });
        sport.tournaments.push(tournament);
      });
      let sportList = [sport];
      this.homeSignalrFormat(sportList);
    });
  }

  sportlistwise() {
    var sportslistdata = [];
    var data = {};
    data['id'] = 4;
    data['name'] = 'Cricket';
    data['ids'] = 1;
    sportslistdata.push(data);

    var data = {};
    data['id'] = 2;
    data['name'] = 'Tennis';
    data['ids'] = 2;
    sportslistdata.push(data);

    var data = {};
    data['id'] = 1;
    data['name'] = 'Soccer';
    data['ids'] = 3;
    sportslistdata.push(data);

    var data = {};
    data['id'] = 7;
    data['name'] = "Horse Racing Today's Card";
    data['ids'] = 4;
    data['otherSport'] = true;
    sportslistdata.push(data);

    var data = {};
    data['id'] = 4339;
    data['name'] = "Greyhound Racing Today's Card";
    data['ids'] = 5;
    data['otherSport'] = true;
    sportslistdata.push(data);

    sportslistdata.sort(function (a, b) {
      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    });
    return sportslistdata;
  }

  homeSignalrFormat(sportsData) {
    _.forEach(sportsData, function (sport, index) {
      var tourDataFormat = {};
      _.forEach(sport.tournaments, function (tour, index2) {
        var matchesDataFormat = {};
        _.forEach(tour.matches, function (match, index3) {
          var marketsDataFormat = {};
          match.id = match.bfId;
          if (match.inPlay) {
            if (DataFormatService.inPlayEventsCount[sport.bfId]) {
              DataFormatService.inPlayEventsCount[sport.bfId] += 1;
            } else {
              DataFormatService.inPlayEventsCount[sport.bfId] = 1;
            }
          }
          _.forEach(match.markets, function (market, index4) {
            marketsDataFormat[market.id] = market;
          });
          matchesDataFormat[match.bfId] = match;
        });
        tourDataFormat[tour.bfId] = {
          bfId: tour.bfId,
          id: tour.id,
          name: tour.name,
          matches: matchesDataFormat,
        };
      });
      DataFormatService.sportsData[sport.bfId] = {
        bfId: sport.bfId,
        id: sport.id,
        name: sport.name,
        tournaments: tourDataFormat,
      };
    });
    return DataFormatService.sportsData;
  }

  highlightwisedata(sprtid: number) {
    var data = {};
    var highlightdata = [];
    var highlightdataIds = [];
    let multimarket = JSON.parse(localStorage.getItem('Multimarkets'));
    _.forEach(DataFormatService.sportsData, function (item: any, index) {
      if (item.bfId == sprtid) {
        _.forEach(item.tournaments, function (item1, index1) {
          _.forEach(item1.matches, function (item2, index2) {
            _.forEach(item2.markets, function (item3, index3) {
              if (item3.name == 'Match Odds') {
                item3.runnerData['bfId'] = item3.bfId;
                item3.runnerData['inPlay'] = item2.inPlay;
                item3.runnerData['isBettingAllow'] = item3.isBettingAllow;
                item3.runnerData['isMulti'] = item3.isMulti;
                item3.runnerData['marketId'] = item3.id;
                item3.runnerData['matchDate'] = item2.startDate;
                item3.runnerData['matchId'] = item2.bfId;
                item3.runnerData['matchName'] = item2.name;
                item3.runnerData['sportName'] = item.name;
                item3.runnerData['status'] = item2.status;
                item3.runnerData['mtBfId'] = item2.bfId;
                item3.runnerData['TourbfId'] = item1.bfId;
                item3.runnerData['SportbfId'] = item.bfId;
                item3.runnerData['isFancy'] = item2.isFancy;
                item3.runnerData['hasBookmaker'] = item2.bookRates
                  ? item2.bookRates.length > 0
                    ? 1
                    : 0
                  : 0;
                _.forEach(multimarket, function (item4) {
                  if (item3.id == item4) {
                    item3.runnerData['isMulti'] = 1;
                  }
                });
                highlightdata.push(item3.runnerData);
                highlightdataIds.push(item3.bfId);
              }
            });
          });
        });
      }
    });
    return highlightdata.sort((a, b) => {
      if (a.inPlay - b.inPlay) {
        return b.inPlay - a.inPlay;
      }
      if (a.inPlay === 0 && b.inPlay == 0) {
        return Date.parse(a.matchDate) - Date.parse(b.matchDate);
      }
    });
    // return highlightdata
  }

  inplaylistwise(sportsData, inplaytype: number) {
    var inplaydata = [];
    let inplayRunnerData = {};
    let multimarket = JSON.parse(localStorage.getItem('Multimarkets'));
    _.forEach(sportsData, function (item, index) {
      var data = {};
      var highlightdata = [];
      var highlightdataIds = [];
      _.forEach(item.tournaments, function (item1, index1) {
        _.forEach(item1.matches, function (item2, index2) {
          // if (item2.inPlay==1 && inplaytype==0) {
          _.forEach(item2.markets, function (item3, index3) {
            if (item3.name == 'Match Odds') {
              item3.runnerData['bfId'] = item3.bfId;
              item3.runnerData['inPlay'] = item2.inPlay;
              item3.runnerData['isBettingAllow'] = item3.isBettingAllow;
              item3.runnerData['isMulti'] = item3.isMulti;
              item3.runnerData['marketId'] = item3.id;
              item3.runnerData['matchDate'] = item2.startDate;
              item3.runnerData['matchId'] = item2.bfId;
              item3.runnerData['matchName'] = item2.name;
              item3.runnerData['sportName'] = item.name;
              item3.runnerData['status'] = item2.status;
              item3.runnerData['mtBfId'] = item2.bfId;
              item3.runnerData['TourbfId'] = item1.bfId;
              item3.runnerData['Tourname'] = item1.name;
              item3.runnerData['SportbfId'] = item.bfId;
              item3.runnerData['hasFancy'] = item2.hasFancy;
              item3.runnerData['hasBookmaker'] = item2.bookRates
                ? item2.bookRates.length > 0
                  ? 1
                  : 0
                : 0;
              _.forEach(multimarket, function (item4) {
                if (item3.id == item4) {
                  item3.runnerData['isMulti'] = 1;
                }
              });
              if (item2.inPlay == 1 && inplaytype == 0) {
                highlightdata.push(item3.runnerData);
                highlightdataIds.push(item3.bfId);
              } else if (
                item2.inPlay != 1 &&
                inplaytype == 1 &&
                new Date(item2.startDate).getDate() === new Date().getDate()
              ) {
                highlightdata.push(item3.runnerData);
                highlightdataIds.push(item3.bfId);
              } else if (
                item2.inPlay != 1 &&
                inplaytype == 2 &&
                new Date(item2.startDate).getDate() === new Date().getDate() + 1
              ) {
                highlightdata.push(item3.runnerData);
                highlightdataIds.push(item3.bfId);
              }
            }
          });
          // }
        });
      });
      data['name'] = item.name;
      data['inplayData'] = highlightdata;
      data['id'] = 0;
      data['bfId'] = item.bfId;
      inplaydata.push(data);
    });
    return inplaydata;
  }

  tournamentlistwise = function (tourlistdata) {
    var tournamentdata = [];
    if (tourlistdata && tourlistdata.tournaments) {
      _.forEach(tourlistdata.tournaments, (item, index) => {
        var data = {};
        data['id'] = index;
        data['name'] = item.name;
        tournamentdata.push(data);
      });
    }
    return tournamentdata;
  };
  matchlistwise(tourlistdata) {
    var matchdata = [];
    if (tourlistdata && tourlistdata.matches) {
      _.forEach(tourlistdata.matches, (item, index) => {
        var data = {};
        data['bfId'] = item.bfId;
        data['id'] = item.id;
        data['name'] = item.name;
        data['startDate'] = item.startDate;
        matchdata.push(data);
      });
    }
    return matchdata;
  }
  marketlistwise(matchlistdata, mtid, tourid, sprtId) {
    var marketdata = [];
    if (matchlistdata && matchlistdata.markets) {
      _.forEach(matchlistdata.markets, (item, index) => {
        var data = {};
        data['bfId'] = item.bfId;
        data['id'] = item.id;
        data['SportId'] = sprtId;
        data['name'] = item.name;
        data['isMulti'] = item.isMulti;
        data['mtId'] = mtid;
        data['isBettingAllow'] = item.isBettingAllow;
        data['TourId'] = tourid;
        data['racing'] = item.racing ? true : false;
        data['inPlay'] = matchlistdata.inPlay;
        marketdata.push(data);
      });
    }
    return marketdata;
  }
}
