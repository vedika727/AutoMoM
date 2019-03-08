import { Component, OnInit, Input } from "@angular/core";
import { MeetingService } from "../core/services/meeting-request/meeting-req";
import { VirtualRoomService } from "../core/services/virtualRoom/virtual-room";
import { IdDetails } from "../shared/models/auth-model";
import { createVirtualRoom } from "../shared/models/virtualRoom";
import { CancelMeeting } from "../shared/models/auth-model";
import { AuthService } from "../core/services/authentication/auth";
import { Router } from "@angular/router";
import { JoinVirtualRoom } from "../shared/models/virtualRoom";
import * as $ from 'jquery';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  token:string
  emailData: IdDetails;
  cancelData: CancelMeeting;
  createVRoom : createVirtualRoom;
  data: Array<Object> = [];
  createRoomData: Array<Object> = [];
  randomToken: string = "";
  participantEmail: Array<Object>;
  participantEmailModel: any = {};
  @Input() public user;
  formatsDateTest: string[] = ["dd/MM/yyyy"];
  dateNow: Date = new Date();
  dateNowISO = this.dateNow.toISOString();
  isVirtualRoomCreated: boolean = false
  joinVirtualRoomReqObj: JoinVirtualRoom;
  meetingId: any;

  constructor(
    public meetService: MeetingService,
    public virtualService: VirtualRoomService,
    private auth: AuthService,
    private router: Router
  ) {
    this.emailData = new IdDetails();
    this.cancelData = new CancelMeeting();
    this.joinVirtualRoomReqObj = new JoinVirtualRoom();
    this.createVRoom = new createVirtualRoom();
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
      }
    );
  }

  generateRandomNumber() {
    this.randomToken = Math.random().toString(36).substring(2);
    console.log("random", this.randomToken);
  }
  sendDetailsToTokenModal(meetingData:any ){
    console.log("sendDetailsToTokenModal",meetingData)
    this.meetingId=meetingData._id
    this.joinVirtualRoomReqObj.id = meetingData._id;
    this.joinVirtualRoomReqObj.email = meetingData.organizerEmail;
  }
  joinVirtualRoom(joinVirtualRoomReqObj: JoinVirtualRoom){
    console.log("meetingId",this.meetingId)
    console.log("joinVirtualRoomReqObj",this.joinVirtualRoomReqObj)
    this.virtualService.joinVirtualRoom(this.joinVirtualRoomReqObj).then((res:any)=>{
      console.log(res);
    },
    (err:any)=>{
      console.log(err)
    })
  }

  createRoom(cancelMeeting){
    this.generateRandomNumber();
    this.createVRoom.id = cancelMeeting._id;
    this.createVRoom.token = this.randomToken;
    console.log("random token",this.randomToken)
    console.log(this.createVRoom)
    this.virtualService.createVirtualRoom(this.createVRoom).then(
      (res: any) => {
        if (res) {
          this.createRoomData = res;
          console.log("create room response ", this.createRoomData);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
