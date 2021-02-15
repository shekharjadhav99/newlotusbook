import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://95.179.144.126:82";
  constructor(
    private httpClient: HttpClient
  ) { }

  getCaptcha() {
    return this.httpClient.get(`${this.baseUrl}/img.png`);
  }

  login(loginData: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, loginData);
  }
}
