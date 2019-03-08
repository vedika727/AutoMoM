import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap'
import { MeetingService } from '../core/services/meeting-request/meeting-req';
import { CreateMeetingPostData } from '../shared/models/meeting.model';

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
  isCollapsed: boolean = false;
  emailArr: any = [];
  createMeetingData: CreateMeetingPostData
  organizerEmail: string;
  constructor(private fb: FormBuilder, private meetingService: MeetingService) {
    // this.emailArr=new Set();
    this.createMeetingData = new CreateMeetingPostData();
    this.todaysDate = new Date().toISOString();
    this.todaysDate = this.todaysDate.split('T');
    this.selectedDate = this.todaysDate[0]
    console.log(this.selectedDate)
    this.organizerEmail = sessionStorage.getItem('emailID');
  }

  ngOnInit() {
    this.meetingRequest = this.fb.group({
      agenda: ['', [Validators.required, Validators.maxLength(40)]],
      orgEmail: [this.organizerEmail],
      parEmail: ['', this.validateParticipantEmail()],
      dateInput: [this.selectedDate, Validators.required],
      stime: ['', Validators.required],
      etime: ['', Validators.required],
      location: ['', Validators.required]
    }
    );
    console.log("meeting request", this.meetingRequest)
    this.request = this.meetingRequest.controls
  }

  onDateSelect(event) {
    let day = event.day.toString();
    let month = event.month.toString();
    let year = event.month.toString();
    day = day.length == 1 ? ("0"+day) : day;
    month = month.length == 1 ? ("0"+month) : month;
    this.selectedDate = (year + "-" + month + "-" + day);
    this.meetingRequest.controls["dateInput"].setValue(
      this.selectedDate
    );
    console.log(this.meetingRequest.value.dateInput)
  }

  addParticipant(email) {
    this.request.parEmail.reset();
    this.emailArr.push(email)
    console.log(this.emailArr)
    this.validateParticipantEmail()
  }

  removeParticipant(email) {
    this.emailArr.pop(email)
    console.log(this.emailArr)
    this.validateParticipantEmail()
  }
  onSubmit() {
    console.log(this.meetingRequest)

    const data =
    {
      "participantEmail": [
        "noopur.singh@capco.com"
      ],
      "organizerEmail": "pranjal.nartam@capco.com",
      "meetingDate": "2019-02-28",
      "startTime": "05:05:05",
      "endTime": "10:10:10",
      "agenda": "r u ok?",
      "location": "Skype"
    }
    const endTime = (this.meetingRequest.value.etime.hour + ":" + this.meetingRequest.value.etime.minute + ":" + this.meetingRequest.value.etime.second)
    const startTime = (this.meetingRequest.value.stime.hour + ":" + this.meetingRequest.value.stime.minute + ":" + this.meetingRequest.value.stime.second)
    this.createMeetingData.participantEmail = this.emailArr;
    this.createMeetingData.organizerEmail = this.meetingRequest.value.orgEmail
    this.createMeetingData.meetingDate = this.selectedDate;
    this.createMeetingData.endTime = endTime;
    this.createMeetingData.startTime = startTime;
    this.createMeetingData.agenda = this.meetingRequest.value.agenda;
    this.createMeetingData.location = this.meetingRequest.value.location
    console.log(this.createMeetingData)
    this.meetingService.postMeetingData(this.createMeetingData).then((res: any) => {
      console.log("meetingService", res)
    },
      (err: any) => {
        console.log("meetingService", err)
      });
  }

  validateParticipantEmail() {
    console.log(this.emailArr.length == 0)
    if (this.meetingRequest) {
      if (this.emailArr.length == 0) {
        this.request.parEmail.setErrors({ required: true });
      }
      else {
        this.request.parEmail.setErrors(false);
      }
    }

  }

}
