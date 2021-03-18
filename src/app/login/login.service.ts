import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://136.244.79.114:81";
  constructor(
    private httpClient: HttpClient
  ) { }

  getImg() {
    return this.httpClient.get(`${this.baseUrl}/img.png`);
  }
  getCaptcha() {
    return this.httpClient.get(`${this.baseUrl}/img.png`);
  }

  login(loginData: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, loginData);
  }

}
