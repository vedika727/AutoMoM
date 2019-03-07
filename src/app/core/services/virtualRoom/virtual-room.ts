import { Injectable } from "@angular/core";
import { HttpService } from "../http/http-service";

@Injectable()
export class VirtualRoomService {
  constructor(private http: HttpService) {}

  // create VirtualRoomService
  createVirtualRoom(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.httpPost("virtualRoom/new", data).then(
        res => {
          resolve(res);
        },
        err => {
          reject(err.error);
        }
      );
    });
  }
}
