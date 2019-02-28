import { Injectable } from '@angular/core';
import { HttpService } from '../http/http-service';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) {
    
  }

  registerUser(data: any) {
      this.http.httpPost("employees",data)
  }

}
