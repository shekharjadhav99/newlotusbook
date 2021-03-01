import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericResponse } from '../types/generic-response';
import { Hierarchy } from '../_services/hierarchy.service';

export const HIERARCY_LIST = 'hierarcy_list';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  private _balanceSub = new ReplaySubject<number>(1);
  balance$ = this._balanceSub.asObservable();

  private _hierarchyMapSub = new ReplaySubject<Map<number, Hierarchy>>(1);
  hierarchyMap$ = this._hierarchyMapSub.asObservable();

  private _hierarchyListSub = new ReplaySubject<Hierarchy[]>(1);
  hierarchyList$ = this._hierarchyListSub.asObservable();


  hierarchy;

  
  clientUserType: number;

  private baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  listHierarchy() {
    this.http
      .get(`${this.baseUrl}/listHierarchy`)
      .subscribe((res: GenericResponse<Hierarchy[][]>) => {
        if (res && res.errorCode === 0) {
          this._hierarchyListSub.next(res.result[0])
        }
      });
  }

  get hierarchyMap(): Map<number, Hierarchy> {
    return this.hierarchy;
  }

  listAllHierarchy() {
    this.http
      .get(`${this.baseUrl}/listAllHierarchy`)
      .subscribe((res: GenericResponse<Hierarchy[][]>) => {
        if (res && res.errorCode === 0) {
          let hierarchyMap = new Map<number, Hierarchy>(
            res.result[0].map((x) => [x.id, x] as [number, Hierarchy])
          );


          this.clientUserType = Array.from(hierarchyMap).find(([k, v]) => {
            return v.name === "client"
          })[0];

          this.hierarchy = hierarchyMap;
          // this.cookieService.set(HIERARCY_LIST, JSON.stringify(hierarchyMap));
          this._hierarchyMapSub.next(hierarchyMap);
        }
      });
  }

  updateBalance() {
    this.http.get(`${this.baseUrl}/balance`)
      .subscribe((res: GenericResponse<{balance: number}[]>) => {
        if (res && res.errorCode === 0) {
          this._balanceSub.next(res.result[0].balance);
        }
      })
  }
}
