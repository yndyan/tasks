import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {Router} from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { HelpService } from '../../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  user: User_t = {
  username: "",
  email: "",
  password : "",

}
  constructor(
    private usrServ: UserService,
    private helpServ: HelpService,
    private router: Router,
    private flashMsg: FlashMessagesService
    
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    this.usrServ.addUser(this.helpServ.genUrlSearchParams(this.user))
      .subscribe(
        data => {
          this.router.navigate(['/user/login']);
        },
        err =>{
          this.flashMsg.show(err.msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
        }
      );
  }
}

interface User_t {
  username:string;
  email:string;
  password:string;
}
