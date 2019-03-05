import { Injectable } from '@angular/core';
import { HttpService } from '../http/http-service';

@Injectable()
export class MeetingService {

  constructor(private http: HttpService) {
    
  }

  getData(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.httpPost('meeting/list',data).then((res) => {
            resolve(res);
        }, err => {
            reject(err.error);
        });
    })

}

}
