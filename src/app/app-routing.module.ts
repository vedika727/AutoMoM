import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './core/guards/authGuard.guard';
import { CreateMeetingRequestComponent } from './create-meeting-request/create-meeting-request.component';

const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent, children: [
      {path: '', component: RegisterComponent},
      { path: 'login', component: LoginComponent },
      {path:'register',component: RegisterComponent}
    ]
  },
  { path: 'dashboard', component: DashboardComponent,
  // , canActivate: [AuthGuard] 
  children: [
    { path: '', redirectTo: 'meetingRequest', pathMatch: 'full'},
    { path: 'meetingRequest', component: CreateMeetingRequestComponent}
  ]
},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
