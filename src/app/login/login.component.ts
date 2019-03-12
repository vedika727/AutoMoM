import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginDetails } from "../shared/models/auth-model";
import { AuthService } from "../core/services/authentication/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("alert") alert: ElementRef;
  loginForm: FormGroup;
  userForm: any;
  loginData: LoginDetails;
  loginError: boolean = false;
  // private emailId : string = '';
  // private password : string = '';
  // emailID:string = this.loginData.email;
  // password: string = this.loginData.password;
  response: any;

  // value = JSON.stringify(value);
  // Create item:
  // let myObj = { name: 'Skip', breed: 'Labrador' };
  // localStorage.setItem(key, JSON.stringify(myObj));

  // // Read item:
  // let item = JSON.parse(localStorage.getItem(key));

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginData = new LoginDetails();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      logEmail: ["", Validators.required],
      logPass: ["", Validators.required]
    });
    this.userForm = this.loginForm.controls;
    console.log(this.loginForm);
    sessionStorage.clear();
  }

  login() {
    this.loginData.email = this.userForm.logEmail.value;
    this.loginData.password = this.userForm.logPass.value;
    console.log(this.loginData);
    this.authService.loginUser(this.loginData).then(
      (res: any) => {
        if (res) {
          console.log(res.token);
          sessionStorage.setItem("emailID", this.loginData.email);
          sessionStorage.setItem("token", res.token);
          this.router.navigate(["/dashboard"]);
        }
      },
      (err: any) => {
        console.log(err);
        this.loginError = true;
      }
    );
  }
  closeAlert() {
    this.alert.nativeElement.classList.remove("show");
  }
}
