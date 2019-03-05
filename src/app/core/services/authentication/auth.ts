import { Injectable } from '@angular/core';
import { HttpService } from '../http/http-service';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) {
    
  }

  registerUser(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.httpPost('api/register', data).then((res) => {
            resolve(res);
        }, err => {
            reject(err.error);
        });
    })

}

  loginUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.httpPost('api/login', data).then((res) => {
            resolve(res);
        }, err => {
            reject(err.error);
        });
    })
  }
}
