import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  redirectUrl: string;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  roles :any;

  constructor(private router: Router) { 
    this.redirectUrl="";
    this.roles="";
  }

  public getToken() {
    return sessionStorage.getItem('acess_token');
  }

  public getUserDetail() {
    let user_details=sessionStorage.getItem('user_details');
    if (user_details) {
      return JSON.parse(user_details);
    } else {
      return null;
    }
  }

  public setToken(data: any) {
    sessionStorage.setItem('acess_token', data.accessToken);
    sessionStorage.setItem('user_details', JSON.stringify(data));
    this.updateRoles();
  }

  checkIfTokenExist():boolean{
      return !!sessionStorage.getItem('acess_token');
  }

  public logout(): void {
    this.redirectUrl = document.location.pathname;
    sessionStorage.removeItem('acess_token');
    sessionStorage.removeItem('user_details');
    this.router.navigate(['']);
    this.loginStatus.emit(false);
    this.updateRoles();
  }

  public updateRoles(){
    let v = sessionStorage.getItem('user_details');
    let a = null;
    if (v && v!== null) {
      a = JSON.parse(v);
    } else {
      a = null;
      this.roles=[]; return;
    }
    if(a.roles){
      this.roles=a.roles;
    }
  }
  public isAdmin(){
    if (this.roles?.includes("ROLE_ADMIN")) return true
    return false;
  }
  public isUser(){
    if (this.roles?.includes("ROLE_USER")) return true
    return false;
  }
}
