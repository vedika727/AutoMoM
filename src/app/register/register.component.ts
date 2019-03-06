import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationDetails } from '../shared/models/auth-model';
import { AuthService } from '../core/services/authentication/auth';
import { MustMatch } from '../shared/validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef;
  registerForm: FormGroup;
  userForm: any;
  registrationData: RegistrationDetails;
  successfullyRegistered: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationData = new RegistrationDetails();
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.maxLength(20)]],
      lname: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@capco.com$")]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      cnfPassword: ['', Validators.required]
    }, 
    {
      validator: MustMatch('password', 'cnfPassword')
  }
  );
    this.userForm=this.registerForm.controls
    console.log(this.userForm)

  }
  onSubmit() {
    this.registrationData.email=this.userForm.email.value;
    this.registrationData.firstName=this.userForm.fname.value;
    this.registrationData.lastName=this.userForm.lname.value;
    this.registrationData.password=this.userForm.cnfPassword.value;
    this.authService.registerUser(this.registrationData).then((res:any)=>{
      console.log(res)
      debugger
      this.successfullyRegistered = true
      },
    (err:any)=>{
      debugger
      console.log(err)  
      this.successfullyRegistered = false
    })
  }
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
}
