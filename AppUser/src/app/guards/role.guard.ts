import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router,Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    public userServ: UserService,
    public router: Router
  ) {

  }
  canActivate(): boolean {
    return this.userServ.checkUserIsAdmin();
  }
}