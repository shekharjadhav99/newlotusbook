import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICurrentUser } from '../shared/types/current-user';
import { ILoginCreds } from '../shared/types/i-login-creds';
import { TokenService } from './token.service';

export const CURRENT_CLIENT = 'current_client';
export const CURRENT_USER = 'current_user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  private _currentUserSub = new BehaviorSubject<ICurrentUser>(null);
  currentUser$ = this._currentUserSub.asObservable();

  private _isLoggedInSub = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedInSub.asObservable();
  currentUser: ICurrentUser;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {
    let isLoggedIn = tokenService.getToken();
    if (isLoggedIn) {
      this.setLoggedIn(true);
    } else {
      this.setLoggedIn(false);
    }
    let current_client = localStorage.getItem(CURRENT_CLIENT);
    if (current_client) {
      this._currentUserSub.next(JSON.parse(current_client));
    }
  }

  login(loginData: ILoginCreds) {
    return this.httpClient.post(`${this.baseUrl}/login`, loginData);
  }

  logout() {
    return this.httpClient.get(`${this.baseUrl}/logout`)
  }

  setCurrentUser(user: ICurrentUser) {
    localStorage.setItem(CURRENT_CLIENT, JSON.stringify(user));
    this._currentUserSub.next(user);
  }

  getCurrentUser() {
    return this._currentUserSub.value;
  }

  setLoggedIn(isLoggedIn: boolean) {
    this._isLoggedInSub.next(isLoggedIn);
  }

  getLoggedIn() {
    return this._isLoggedInSub.value;
  }

  ping() {
    return this.httpClient.get(`${this.baseUrl}/ping`);
  }
}

