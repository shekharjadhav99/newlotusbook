import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-livecomentry',
  
  templateUrl: './livecomentry.component.html',
  styleUrls: ['./livecomentry.component.css']
})
export class LivecomentryComponent implements OnInit {
  
  
  

  constructor(
    private toastr: ToastrService) { }

    showSuccess(){
      this.toastr.error('Not Save Sucessfully','Error');
    }
    
  
  ngOnInit(): void {
    
    
  }

}
