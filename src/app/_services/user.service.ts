import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBalance } from '../shared/types/balance';
import { GenericResponse } from '../shared/types/generic-response';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;

  private _balanceSub = new BehaviorSubject<any>(null);
  balance$ = this._balanceSub.asObservable();

  private _openBetsSub = new BehaviorSubject<any>(null);
  openBets$ = this._openBetsSub.asObservable();
  getBets: any;

  constructor(private httpClient: HttpClient) {}

  balance() {
    return this.httpClient.get(`${this.baseUrl}/balance`);
  }

  getBalance() {
    this.balance().subscribe((balance: GenericResponse<IBalance>) => {
      if (balance.errorCode === 0) {
        this._balanceSub.next(balance.result[0]);
      }
    });
  }

  bets() {
    return this.httpClient.get(`${this.baseUrl}/listBets`);
  }


  listBooks(marketId) {
    return this.httpClient.get(`${this.baseUrl}/listBooks/${marketId}`);
  }
}
