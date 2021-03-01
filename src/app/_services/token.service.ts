import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

export const AUTH_TOKEN = 'authtoken_web';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token: string) {
    this.cookieService.put(AUTH_TOKEN, token);
  }

  getToken() {
    return this.cookieService.get(AUTH_TOKEN);
  }

  removeToken() {
    this.cookieService.remove(AUTH_TOKEN);
  }
}
