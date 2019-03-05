import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-create-meeting-request',
  templateUrl: './create-meeting-request.component.html',
  styleUrls: ['./create-meeting-request.component.scss']
})
export class CreateMeetingRequestComponent implements OnInit {

  @ViewChild(NgbDatepicker) d: NgbDatepicker;
  meetingRequest: FormGroup
  request: any;
  selectedDate: any;
  todaysDate: any;
  isCollapsed:boolean = false;
  emailArr: any;
  constructor(private fb: FormBuilder) {
    this.emailArr=new Set();
    this.todaysDate = new Date().toISOString();
    this.todaysDate = this.todaysDate.split('T');
    this.selectedDate = this.todaysDate[0]
    console.log(this.selectedDate)
  }

  ngOnInit() {
    this.meetingRequest = this.fb.group({
      agenda: ['', [Validators.required, Validators.maxLength(40)]],
      orgEmail: ['',[Validators.required]],
      parEmail: ['',[Validators.required]],
      // date: ['', Validators.required],
      dateInput: ['', Validators.required],
      stime: ['', Validators.required],
      etime: ['', Validators.required]
    }
    );
    console.log("meeting request", this.meetingRequest)
    this.request=this.meetingRequest.controls
  }

  onDateSelect(event){
    console.log(event)
    this.selectedDate = (event.year + "-"  + event.month + "-" + event.day);
    console.log
  }

  addParticipant(email) {
    this.emailArr.add(email)
  }
  onSubmit(){
    console.log("onSubmit called")
  }

}
