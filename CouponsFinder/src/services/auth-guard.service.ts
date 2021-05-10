import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private utilityService: UtilityService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (this.utilityService.checkIfTokenExist()) {
      return true;
    }

    this.utilityService.redirectUrl = url;
    //this.router.navigate['/'];
    return false;
  }
}
