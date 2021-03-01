import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBalance } from '../shared/types/balance';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private _balanceDataSub = new BehaviorSubject<IBalance>(null);
  balanceData$ = this._balanceDataSub.asObservable();

  constructor() { }

  setBalanceData(balanceData: IBalance) {
    this._balanceDataSub.next(balanceData);
  }
}
