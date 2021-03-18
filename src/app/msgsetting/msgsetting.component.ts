import { Component, OnInit } from '@angular/core';
import { MessageService} from '../_services/message.service';


@Component({
  selector: 'app-msgsetting',
  templateUrl: './msgsetting.component.html',
  styleUrls: ['./msgsetting.component.css']
})
export class MsgsettingComponent implements OnInit {



  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  onChange(mname){
    console.log(mname.value)
    this.messageService.message.next(mname.value)
  }
}
