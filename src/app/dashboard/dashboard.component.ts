import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/authentication/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.isUserAuthenticated = false;
    this.router.navigate(['/authentication/register'])
  }
}
