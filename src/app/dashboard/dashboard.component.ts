import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/authentication/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
  constructor( private auth: AuthService, private router: Router) { 
    
  }

  ngOnInit() {  
  }
  
  logout() {
    this.auth.isUserAuthenticated = false;
    this.router.navigate(['/authentication/register'])
  }
  
 
}
