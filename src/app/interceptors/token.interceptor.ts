import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { TokenService } from '../_services/token.service';
  
  @Injectable()
  export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router, private tokenService: TokenService) {}
  
    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      let req = request.clone();
      if (
        !(
          req.url.includes('/login') ||
          req.url.includes('/img.png') ||
          req.url.toLowerCase().includes('/matchodds') ||
          req.url.toLowerCase().includes('/horseraces') ||
          req.url.toLowerCase().includes('/greyhoundraces') ||
          req.url.toLowerCase().includes('/marketdescription')
        )
      ) {
        if (this.tokenService.getToken()) {
          req = request.clone({
            setHeaders: { Authorization: this.tokenService.getToken() },
          });
        }
      }
      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (
              event?.body?.errorDescription
                ?.toLowerCase()
                .includes('no session') ||
              event?.body?.errorDescription
                ?.toLowerCase()
                .includes('session expired')
            ) {
              this.router.navigateByUrl('/login');
            }
          }
          return event;
        })
      );
    }
  }
  