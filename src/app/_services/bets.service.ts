import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  placeBet(betData: any) {
    return this.httpClient.post(`${this.baseUrl}/placeBets`, betData);
  }

  placeTPBet(tpBetData: any) {
    return this.httpClient.post(`${this.baseUrl}/TPplaceBets`, tpBetData);
  }
}
