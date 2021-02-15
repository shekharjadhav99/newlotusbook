import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
;
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { AcinfoComponent } from './acinfo/acinfo.component';
import { AddManualFancyComponent } from './add-manual-fancy/add-manual-fancy.component';
import { AddfancyComponent } from './addfancy/addfancy.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppleadminComponent } from './appleadmin/appleadmin.component';
import { BettingComponent } from './betting/betting.component';
import { BettingcricketComponent } from './bettingcricket/bettingcricket.component';
import { BettingsoccerComponent } from './bettingsoccer/bettingsoccer.component';
import { BettingtennisComponent } from './bettingtennis/bettingtennis.component';
import { BlockmarketComponent } from './blockmarket/blockmarket.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChildlistComponent } from './childlist/childlist.component';
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { FirstnavigationComponent } from './firstnavigation/firstnavigation.component';
import { FooterComponent } from './footer/footer.component';
import { LivecomentryComponent } from './livecomentry/livecomentry.component';
import { LivegameComponent } from './livegame/livegame.component';
import { LivegamesettingComponent } from './livegamesetting/livegamesetting.component';
import { LoginComponent } from './login/login.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { MsgsettingComponent } from './msgsetting/msgsetting.component';
import { RunningmarketComponent } from './runningmarket/runningmarket.component';
import { SessionFancyComponent } from './session-fancy/session-fancy.component';
import { SetresultComponent } from './setresult/setresult.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabsComponent } from './tabs/tabs.component';
import { TeenpattiComponent } from './teenpatti/teenpatti.component';
import { WebsitesettingComponent } from './websitesetting/websitesetting.component';
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UseronlineComponent } from './useronline/useronline.component';
import { OnoffComponent } from './onoff/onoff.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminonlineComponent } from './adminonline/adminonline.component';
import { SupermasteronComponent } from './supermasteron/supermasteron.component';
import { MasteronComponent } from './masteron/masteron.component';
import { UseronComponent } from './useron/useron.component';
import { ClientplComponent } from './clientpl/clientpl.component';
import { MarketplComponent } from './marketpl/marketpl.component';
import { SportplComponent } from './sportpl/sportpl.component';
import { UserplComponent } from './userpl/userpl.component';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import { BethistoryComponent } from './bethistory/bethistory.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { ModalModule } from "ngx-bootstrap/modal";
import { ZerobalanceuserComponent } from './zerobalanceuser/zerobalanceuser.component';
import { UsergeneralsettingComponent } from './usergeneralsetting/usergeneralsetting.component';
import { MatchgeneralsettingComponent } from './matchgeneralsetting/matchgeneralsetting.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FirstnavigationComponent,
    AddManualFancyComponent,
    ContainerComponent,
    DashboardComponent,
    FavouriteComponent,
    FooterComponent,
    LivegameComponent,
    MainContainerComponent,
    SessionFancyComponent,
    SidebarComponent,
    TabsComponent,
    TeenpattiComponent,
    BlockmarketComponent,
    AddfancyComponent,
    BettingComponent,
    RunningmarketComponent,
    ChangepasswordComponent,
    BettingcricketComponent,
    BettingtennisComponent,
    BettingsoccerComponent,
    SetresultComponent,
    WebsitesettingComponent,
    MsgsettingComponent,
    LivecomentryComponent,
    LivegamesettingComponent,
    AdminComponent,
    ChildlistComponent,
    AppleadminComponent,
    AcinfoComponent,
    UseronlineComponent,
    OnoffComponent,
    AdminonlineComponent,
    SupermasteronComponent,
    MasteronComponent,
    UseronComponent,
    ClientplComponent,
    MarketplComponent,
    SportplComponent,
    UserplComponent,
    ProfitlossComponent,
    BethistoryComponent,
    ZerobalanceuserComponent,
    UsergeneralsettingComponent,
    MatchgeneralsettingComponent,

    
    
   



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
    NgxPaginationModule,
    ModalModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
