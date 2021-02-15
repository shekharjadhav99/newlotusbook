import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-matchgeneralsetting',
  templateUrl: './matchgeneralsetting.component.html',
  styleUrls: ['./matchgeneralsetting.component.css']
})
export class MatchgeneralsettingComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
  }

}
 
