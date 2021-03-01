import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-setresult',
  templateUrl: './setresult.component.html',
  styleUrls: ['./setresult.component.css']
})
export class SetresultComponent  {
  searchText;
  
  
  public data = [];
  
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;
  
 
  constructor() {
    console.log('Application loaded. Initializing data.');
 
    this.data = [
     
      {'id':'1.','name':'Kenil RSA 25th Nov', 'mname':'Kenil RSA 25th Nov','marketname':'R3 1200m Plt','checkbox':''},
      { 'id': '2.', 'name': 'Wodg AUS 27th Nov', 'mname':'Wodg AUS 27th Nov','marketname':'R1 1200m Mdn','checkbox':''  },
      { 'id': '3.', 'name': 'Wodg AUS 27th Nov','mname':'Wodg AUS 27th Nov','marketname':'R2 1100m Mdn ','checkbox':''  },
      { 'id': '4.', 'name': 'Canb AUS 27th Nov', 'mname':'Kenil RSA 25th Nov','marketname':'R3 1200m Plt','checkbox':'' },
      { 'id': '5.', 'name': 'Kilc AUS 29th Nov', 'mname':'Kilc AUS 29th Nov','marketname':'R1 1500m CL5','checkbox':'' },
      { 'id': '6.', 'name': 'Kilc AUS 29th Nov','mname':'Kilc AUS 29th Nov','marketname':'R2 1500m Mdn ','checkbox':'' },
      { 'id': '7.', 'name': 'Kilc AUS 29th Nov', 'mname':'Kilc AUS 29th Nov','marketname':'R3 1900m Hcap','checkbox':''},
      { 'id': '8.', 'name': 'Kilc AUS 29th Nov','mname':'Kilc AUS 29th Nov','marketname':'R4 1060m 3yo','checkbox':'' },
      { 'id': '9.', 'name': 'Kilc AUS 29th Nov',  'mname':'Kilc AUS 29th Nov','marketname':'R5 1500m Hcap','checkbox':''  },
      { 'id': '10.', 'name': 'Kilc AUS 29th Nov','mname':'Kilc AUS 29th Nov','marketname':'R6 800m CL3','checkbox':'' },
      { 'id': '11.', 'name': 'Kilc AUS 29th Nov','mname':'Kilc AUS 29th Nov','marketname':'R7 1060m Hcap','checkbox':''},
      { 'id': '12.', 'name': 'Kilc AUS 29th Nov', 'mname':'Kilc AUS 29th Nov','marketname':'R8 1200m CL1','checkbox':''},
      { 'id': '13.', 'name': 'English League 2', 'mname':'Cambridge Utd v Mansfield','marketname':'Match Odds ','checkbox':'' },
      { 'id': '14.', 'name': 'Campinas Challenger 2020', 'mname':'Dutra Silva/Romboli v Doumbia/Reboul ','marketname':'Match Odds','checkbox':'' },
      { 'id': '15.', 'name': 'Campinas Challenger 2020','mname':'Bueres/Camargo Lima v Cuevas/Duran','marketname':'Match Odds','checkbox':'' },
      { 'id': '16.', 'name': 'Spanish Segunda Division','mname':'Fuenlabrada v Malaga','marketname':'Match Odds ','checkbox':''  },
      { 'id': '17.', 'name': 'Northern Irish Premiership', 'mname':'Ballymena v Carrick Rangers','marketname':'Match Odds','checkbox':'' },
      { 'id': '18.', 'name': 'Qatari Q League ','mname':'Al Mu Aidar SC v Al Bidda','marketname':'Match Odds','checkbox':'' },
      { 'id': '19.', 'name': 'Campinas Challenger 2020', 'mname':'Luz v Tabilo','marketname':'Match Odd','checkbox':'' },
      { 'id': '20.', 'name': 'Wagg AUS 6th Dec', 'mname':'Wagg AUS 6th Dec','marketname':'R4 1740m Pace M','checkbox':'' }
    ];
  }
}