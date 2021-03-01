import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LivegameComponent } from './livegame/livegame.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddManualFancyComponent } from './add-manual-fancy/add-manual-fancy.component';
import { SessionFancyComponent } from './session-fancy/session-fancy.component';
import { TeenpattiComponent } from './teenpatti/teenpatti.component';
import { BlockmarketComponent } from './blockmarket/blockmarket.component';
import { AddfancyComponent } from './addfancy/addfancy.component';
import { RunningmarketComponent } from './runningmarket/runningmarket.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BettingcricketComponent } from './bettingcricket/bettingcricket.component';
import { BettingtennisComponent } from './bettingtennis/bettingtennis.component';
import { BettingsoccerComponent } from './bettingsoccer/bettingsoccer.component';
import { SetresultComponent } from './setresult/setresult.component';
import { WebsitesettingComponent } from './websitesetting/websitesetting.component';
import { MsgsettingComponent } from './msgsetting/msgsetting.component';
import { LivecomentryComponent } from './livecomentry/livecomentry.component';
import { LivegamesettingComponent } from './livegamesetting/livegamesetting.component';
import { AdminComponent } from './admin/admin.component';
import { ChildlistComponent } from './childlist/childlist.component';
import { AppleadminComponent } from './appleadmin/appleadmin.component';
import { AcinfoComponent } from './acinfo/acinfo.component';
import { LoginComponent } from './login/login.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { UseronlineComponent } from './useronline/useronline.component';
import { OnoffComponent} from './onoff/onoff.component';
import { AdminonlineComponent} from './adminonline/adminonline.component';
import { SupermasteronComponent } from './supermasteron/supermasteron.component';
import { MasteronComponent } from './masteron/masteron.component';
import { UseronComponent} from './useron/useron.component';
import { ClientplComponent } from './clientpl/clientpl.component';
import { MarketplComponent } from './marketpl/marketpl.component';
import { SportplComponent} from './sportpl/sportpl.component';
import {UserplComponent} from './userpl/userpl.component';
import { ProfitlossComponent} from './profitloss/profitloss.component';
import { BethistoryComponent } from './bethistory/bethistory.component';
import { ZerobalanceuserComponent} from './zerobalanceuser/zerobalanceuser.component';
import {UsergeneralsettingComponent } from './usergeneralsetting/usergeneralsetting.component';
import { MatchgeneralsettingComponent} from './matchgeneralsetting/matchgeneralsetting.component';
import { ChipsummaryComponent} from './chipsummary/chipsummary.component'; 
import {CricketComponent } from './cricket/cricket.component';
import {InplayComponent} from './inplay/inplay.component';
import {SoccerComponent} from './soccer/soccer.component';
import {TennisComponent } from './tennis/tennis.component';
import { FullmarketComponent } from './fullmarket/fullmarket.component';




const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: ':sportid/:tourid/:matchId/:marketId/:bfId',
        component: FullmarketComponent,
      },
      {
        path: ':sportid/:tourid/:matchId/:marketId',
        component: FullmarketComponent,
      },
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'livegame', component: LivegameComponent },
      { path: 'favourite', component: FavouriteComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'addmanualfancy', component: AddManualFancyComponent },
      { path: 'sessionfancy', component: SessionFancyComponent },
      { path: 'teenpatti', component: TeenpattiComponent },
      { path: 'blockmarket', component: BlockmarketComponent },
      { path: 'addfancy', component: AddfancyComponent },
      { path: 'runningmarket', component: RunningmarketComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      { path: 'bettingcricket', component: BettingcricketComponent },
      { path: 'bettingtennis', component: BettingtennisComponent },
      { path: 'bettingsoccer', component: BettingsoccerComponent },
      { path: 'setresult', component: SetresultComponent },
      { path: 'websitesetting', component: WebsitesettingComponent },
      { path: 'msgsetting', component: MsgsettingComponent },
      { path: 'livecommentry', component: LivecomentryComponent },
      { path: 'livegamesetting', component: LivegamesettingComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'childlist', component: ChildlistComponent },
      { path: 'appleadmin', component: AppleadminComponent },
      { path: 'acinfo', component: AcinfoComponent },
      {path:'useronline',component:UseronlineComponent},
      {path:'onoff',component:OnoffComponent},
      {path:'adminonline',component:AdminonlineComponent},
      {path:'supermasteron',component:SupermasteronComponent},
      {path:'masteron',component:MasteronComponent},
      {path:'useron',component:UseronComponent},
      {path:'clientpl',component:ClientplComponent},
      {path:'marketpl',component:MarketplComponent},
      {path:'sportpl',component:SportplComponent},
      {path:'userpl',component:UserplComponent},
      {path:'profitloss',component:ProfitlossComponent},
      {path:'bethistory',component:BethistoryComponent},
      {path:'zerobalanceuser',component:ZerobalanceuserComponent},
      {path:'usergeneralsetting',component:UsergeneralsettingComponent},
      {path:'matchgeneralsetting',component:MatchgeneralsettingComponent},
      {path:'chipsummary',component:ChipsummaryComponent},
      {path:'cricket',component:CricketComponent},
      {path:'inplay',component:InplayComponent},
      {path:'soccer',component:SoccerComponent},
      {path:'tennis',component:TennisComponent},
      {path:'fullmarket',component:FullmarketComponent}

    ]
  },

  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]



})
export class AppRoutingModule { }
