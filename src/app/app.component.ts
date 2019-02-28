import {Component }from '@angular/core'; 
import {HttpServiceProvider }from './core/services/http/http-service'; 

@Component( {
  selector:'app-root', 
  templateUrl:'./app.component.html', 
  styleUrls:['./app.component.scss']
})
export class AppComponent {

  constructor(private service:HttpServiceProvider) {}

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
