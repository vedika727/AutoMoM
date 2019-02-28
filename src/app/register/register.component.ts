import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationDetails } from '../shared/models/register-form';
import { AuthService } from '../core/services/authentication/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  userForm: any;
  registrationData: RegistrationDetails;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationData = new RegistrationDetails();
    this.registrationData.email='hbhj'
    console.log(this.registrationData)
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.userForm=this.registerForm.controls
  }

  onSubmit() {
    this.registrationData.email=this.userForm.email.value;
    this.registrationData.name=this.userForm.name.value;
    this.registrationData.password=this.userForm.cnfPassword.value;
    console.log(this.registrationData)
    this.authService.registerUser(this.registrationData).then((res:any)=>{
      console.log(res)
      },
    (err:any)=>{
      console.log(err)  
    })
  }
}
