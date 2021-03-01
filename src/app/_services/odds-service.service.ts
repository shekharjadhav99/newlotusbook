import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OddsServiceService {
  oddsUrl = environment.oddsUrl;
  private _oddsSub = new BehaviorSubject<any>(null);
  odds$ = this._oddsSub.asObservable();
  matchDataHome: any;

  constructor(private httpClient: HttpClient) {}

  getMatchOdds(sportId: number, ids: string) {
    return this.httpClient.get(`${this.oddsUrl}/matchOdds/${sportId}/?ids=${ids}`);
  }

  getOddsOfMatches(matches: any[], sportId?: number) {
    var ids = [];
    matches.forEach((match, index) => {
      if (sportId === +match.SportbfId) {
        ids.push(match.bfId);
      }
    });
    if (ids.length) {
      this.getMatchOdds(sportId, ids.join(','))
        .subscribe((res: any[]) => {
          res.forEach((market) => {
            this.matchDataHome[market.eventId] = market;
            this._oddsSub.next(this.matchDataHome);
          });
        });
    }
    return this.odds$;
  }
}
