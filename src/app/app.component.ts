import {Component }from '@angular/core'; 
import {HttpService }from './core/services/http/http-service'; 

@Component( {
  selector:'app-root', 
  templateUrl:'./app.component.html', 
  styleUrls:['./app.component.scss']
})
export class AppComponent {

  constructor(private service:HttpService) {}
  register = true
  title = 'AutoMoM';
  
  users(){
    let data= {
      name: 'mohini'
    }
    this.service.httpPost('users',data);
  }

  name: String = 'Mohini';

  getFullName() {
    // var name= "p";
    this.name = 'akshay';
  }

  
  
 
}
