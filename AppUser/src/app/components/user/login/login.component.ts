import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { HelpService } from '../../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User_t = {
    username:"",
    password:""
  }
  constructor(
      private usrServ: UserService,
      private helpServ: HelpService,
      private router: Router,
      private flashMsg: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    this.usrServ.authUser(this.helpServ.genUrlSearchParams(this.user)).subscribe(
      data=>{
        this.usrServ.storeUserData(data.token, data.role);
        this.router.navigate([(data.role === "admin")?  'admin':'projects']);
      }, 
      err=>{
        this.flashMsg.show(err.json().msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
  );

  }

}

interface User_t {
  username:string;
  password:string;
}
