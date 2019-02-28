import { Injectable } from '@angular/core';
import { HttpService } from '../http/http-service';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) {
    
  }

  registerUser(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.httpPost('register', data).then((res) => {
            resolve(res);
        }, err => {
            reject(err.error);
        });
    })

}

  loginUser(data: any) {
    let subUrl="login";
      this.http.httpPost(subUrl,data)
  }

}
