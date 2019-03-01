import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationDetails } from '../shared/models/register-form';
import { AuthService } from '../core/services/authentication/auth';
import { MustMatch } from '../shared/validators/must-match.validator';

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
      name: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@capco.com$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, 
    {
      validator: MustMatch('password', 'cnfPassword')
  }
  );
    this.userForm=this.registerForm.controls
    console.log(this.registerForm)
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
