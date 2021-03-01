import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullmarketComponent } from './fullmarket.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':sportid/:tourid/:matchId/:marketId/:bfId',
        component: FullmarketComponent,
      },
      {
        path: ':sportid/:tourid/:matchId/:marketId',
        component: FullmarketComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [FullmarketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ModalModule.forRoot(),
  ],
})
export class FullmarketModule {}
