import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public userServ: UserService,
    public router: Router
  ){
  }

  canActivate(): boolean {

    //console.log(this.userSerw.checkTokenNotExpired());
    if(this.userServ.checkTokenNotExpired()){
      return true;
    } else {
      this.router.navigate(['user/login']);
      return false;
    }

  }

  canActivateChild(): boolean {
    console.log(this.userServ.checkTokenNotExpired());
    if(this.userServ.checkTokenNotExpired()){
      return true;
    } else {
      //this.router.navigate(['user/login']);
      return false;
    }

  }

}
