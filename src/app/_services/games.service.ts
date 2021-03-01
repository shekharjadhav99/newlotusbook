import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  baseUrl = environment.baseUrl;
  raceUrl = environment.raceUrl;

  constructor(private httpClient: HttpClient) {}

  listGames() {
    return this.httpClient.get(`${this.baseUrl}/listGames`);
  }

  horseRacingGames() {
    return this.httpClient.get(`${this.baseUrl}/listHorseRaces`);
  }

  greyhoundGames() {
    return this.httpClient.get(`${this.baseUrl}/listGreyhoundRaces`);
  }
}
