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
  data : Array<Object>;
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    ];
    dateNow : Date = new Date();
    dateNowISO = this.dateNow.toISOString();

  constructor(public meetService: MeetingService) {
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
  
  logout() {
    this.auth.isUserAuthenticated = false;
    this.router.navigate(['/authentication/register'])
  }
  
 
}
