import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../core/services/meeting-request/meeting-req';
import { IdDetails } from '../shared/models/auth-model';
import { AuthService } from '../core/services/authentication/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  emailData : IdDetails;
  loginError: boolean = false;
  data : Array<Object>;
  participantsData : Array<Object>;
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    ];
    dateNow : Date = new Date();
    dateNowISO = this.dateNow.toISOString();

  constructor(public meetService: MeetingService, private auth:AuthService, private router: Router) {
    this.emailData = new IdDetails();
   }

  ngOnInit() { 
     this.getMeeting();
  }
  getMeeting(){
    this.emailData.email = 'test@gmail.com';
    console.log(this.emailData);
    this.meetService.getData(this.emailData).then((res: any) => {
      if (res) {
         this.data = res;
         console.log(this.data);
      }
    },
      (err: any) => {
        console.log(err)
        this.loginError=true
      })
  }

  participants(){
    // for(let i=0;i<this.data.length;i++)
    // {
    //   this.participants = this.data[i].participantEmail;
    //     this.participantsData.push(this.participants);
    //         console.log(this.participantsData)
    // }
  }
  
  logout() {
    this.auth.isUserAuthenticated = false;
    this.router.navigate(['/authentication/register'])
  }
  
 
}
