import { Injectable } from '@angular/core';
import {HttpClientModule,HttpClient,HttpHeaders} from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerNewUser(userDetails: any){
    return this.http.post('http://localhost:3000/api/auth/signup',userDetails,httpOptions);
  }
  
  loginUser(userDetails:any){
    return this.http.post('http://localhost:3000/api/auth/signin',userDetails,httpOptions);
  }

  subscribeToNewsletter(email: string) {
    return this.http.get('http://localhost:3000/addSubscriber/'+email, httpOptions);
  }
}

