import { Component, OnInit, Input } from "@angular/core";
import { MeetingService } from "../core/services/meeting-request/meeting-req";
import { IdDetails } from "../shared/models/auth-model";
import { CancelMeeting } from "../shared/models/auth-model";
import { AuthService } from "../core/services/authentication/auth";
import { Router } from "@angular/router";
import { JoinVirtualRoom } from "../shared/models/virtualRoom";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  token:string
  emailData: IdDetails;
  cancelData: CancelMeeting;
  loginError: boolean = false;
  data: Array<Object> = [];
  participantEmail: Array<Object>;
  participantEmailModel: any = {};
  @Input() public user;
  formatsDateTest: string[] = ["dd/MM/yyyy"];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  isVirtualRoomCreated: boolean = true
  joinVirtualRoomReqObj: JoinVirtualRoom;

  constructor(
    public meetService: MeetingService,
    private auth: AuthService,
    private router: Router
  ) {
    this.emailData = new IdDetails();
    this.cancelData = new CancelMeeting();
    this.joinVirtualRoomReqObj = new JoinVirtualRoom();
  }

  ngOnInit() {
    this.getMeeting();
    //console.log(this.data);
  }
  getMeeting() {
    this.data = [];
    this.emailData.email = sessionStorage.getItem("emailID");
    //console.log(this.emailData);
    this.meetService.getData(this.emailData).then(
      (res: any) => {
        if (res) {
          this.data = res;
          console.log("Get all meetings ", this.data);
        }
      },
      (err: any) => {
        console.log(err);
        this.loginError = true;
      }
    );
  }
  // model data
  participants(modeldata) {
    this.participantEmailModel = modeldata;
  }

  logout() {
    this.auth.isUserAuthenticated = false;
    this.router.navigate(["/authentication/register"]);
  }
  cancel(cancelMeeting) {
    this.cancelData.id = cancelMeeting._id;
    this.cancelData.status = "n";
    this.meetService.cancelData(this.cancelData).then(
      (res: any) => {
        if (res) {
          this.getMeeting();
        }
      },
      (err: any) => {
        console.log(err);
        this.loginError = true;
      }
    );
  }

  generateRandomNumber() {
    let r = Math.random().toString(36).substring(2);
    console.log("random", r);
  }
  joinVirtualRoom(joinVirtualRoomReqObj: JoinVirtualRoom){
    this.joinVirtualRoomReqObj.email = this.emailData.email;
    // this.joinVirtualRoomReqObj.token =  
    console.log("joinVirtualRoomReqObj",this.joinVirtualRoomReqObj)
  }
}
