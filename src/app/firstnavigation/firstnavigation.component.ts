import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-firstnavigation',
  templateUrl: './firstnavigation.component.html',
  styleUrls: ['./firstnavigation.component.css']
})
export class FirstnavigationComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  message: string;
  constructor(private modalService: BsModalService) { }
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


  }

  ngOnDestroy() {
  }


}