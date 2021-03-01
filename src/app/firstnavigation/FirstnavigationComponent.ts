import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { ICurrentUser } from '../shared/types/current-user';
import { CommonService } from '../_services/common.service';
import { Hierarchy } from '../_services/hierarchy.service';
import { UserService } from '../_services/user.service';



@Component({
  selector: 'app-firstnavigation',
  templateUrl: './firstnavigation.component.html',
  styleUrls: ['./firstnavigation.component.css']
})
export class FirstnavigationComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  message: string;

  currentUser: ICurrentUser;

  balance: number = 0;
  heirarchyList?: Hierarchy[];

  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private common: CommonService,

    private usersService: UserService


  ) { }
  openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }




  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
  
   
    this.common.balance$.subscribe((balance:any) => {
      this.balance = balance;
    });
  }

 




  logout() {
    this.tokenService.setToken(null);
    this.authService.setLoggedIn(false);
    this.router.navigateByUrl('/login');
    this.authService
      .logout()
      .subscribe(() => {
        this.tokenService.setToken(null);
        this.authService.setLoggedIn(false);
        this.router.navigateByUrl('/login');
      });
  }
  updateBalance() {
    this.common.updateBalance();
  }


  ngOnDestroy() {
  }


}
