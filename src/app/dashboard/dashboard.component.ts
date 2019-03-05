import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../core/services/meeting-request/meeting-req';
import { IdDetails } from '../shared/models/auth-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  emailData : IdDetails;
  loginError: boolean = false;
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    ];
    dateNow : Date = new Date();
    dateNowISO = this.dateNow.toISOString();

    public myArray : Array<Object> = [
      {
        subject: "Scrum Meeting", Meeting: 'Meeting 1', to:'23 jan 2019',from : '28 feb 2019'
      },
      {
        subject: "project Meeting", Meeting: 'Meeting 2',to:'23 jan 2019',from : '28 feb 2019'
      },
      {
        subject: "AutoMoM Meeting", Meeting: 'Meeting 3',to:'23 jan 2019',from : '28 feb 2019'
      },
      {
        subject: "daily standup Meeting", Meeting: 'Meeting 4',to:'23 jan 2019',from : '28 feb 2019'
      },
  ];

  constructor(public meetService: MeetingService) {
    this.emailData = new IdDetails();
   }

  ngOnInit() { 
     this.getMeeting();
  }
  getMeeting(){
    // this.email = this.emailData;
    this.emailData.email = 'test@gmail.com';
    console.log(this.emailData.email);
    this.meetService.getData(this.emailData).then((res: any) => {
      if (res) {
        console.log(res);
      }
    },
      (err: any) => {
        console.log(err)
        this.loginError=true
      })
  }
 
}
