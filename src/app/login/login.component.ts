import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDetails } from '../shared/models/auth-model';
import { AuthService } from '../core/services/authentication/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userForm: any;
  loginData : LoginDetails;

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.loginData = new LoginDetails();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      logEmail: ['', Validators.required],
      logPass: ['', Validators.required],
    });
    this.userForm = this.loginForm.controls
  }

  login(){
    this.loginData.email=this.userForm.logEmail.value;
    this.loginData.password=this.userForm.logPass.value;
    console.log(this.loginData)
    this.authService.loginUser(this.loginData).then((res:any)=>{
      console.log(res)
      },
    (err:any)=>{
      console.log(err)  
    })
  }
  

}
