import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FullmarketService {
  baseUrl = environment.baseUrl;
  raceUrl = environment.raceUrl;
  oddsSocketUrl = environment.oddsSocketUrl;

  private _oddsSub = new BehaviorSubject<any>(null);
  odds$ = this._oddsSub.asObservable();

  subject$: WebSocket;

  marketId;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  loadEvent(eventId: number) {
    return this.httpClient.get(`${this.baseUrl}/loadEvent/${eventId}`);
  }

  getFancyExposure(eventId) {
    return this.httpClient.get(`${this.baseUrl}/fancyExposure/${eventId}`)
  }

  getFancyBook(marketId, fancyId) {
    return this.httpClient.get(`${this.baseUrl}/listBooks/df_${marketId}_${fancyId},`)
  }

  marketDescription(marketId: string) {
    return this.httpClient.get(`${this.raceUrl}/marketDescription/${marketId}`)
  }

  getWebSocketData(marketdata) {
    if (marketdata && marketdata.port && this.marketId !== marketdata.bfId) {
      this.marketId = marketdata.bfId;
      var url = `${this.oddsSocketUrl}:${marketdata.port}/${
        this.authService.getLoggedIn() ? '?logged=true' : '?logged=false'
      }`;

      if (!this.subject$ || this.subject$.CLOSED) {
        this.subject$ = new WebSocket(url);
        console.log(this.subject$);

        this.subject$.onmessage = ((message: any) => {
          message = JSON.parse(message.data);
          this._oddsSub.next(message);
        });
      }
      return this.odds$;
    }
  }

  closeConnection() {
    if (this.subject$ && this.subject$.OPEN) {
      this._oddsSub.next(null);
      this.subject$.close();
    }
  }
}
