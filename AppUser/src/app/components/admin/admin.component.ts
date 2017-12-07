import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { HelpService } from '../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User_t[] = [{
    username:'',
    email:'',
    role:'',
    emailVerified:''
  }];
  arrayOfKeys:any;
  constructor(
      private adminServ : AdminService,
      private helpServ: HelpService,
      private flashMsg: FlashMessagesService
  ) {
    this.arrayOfKeys = Object.keys(this.users[0]);
    this.subToUser();
  }
  subToUser(){
    this.adminServ.getUsers().subscribe(
      data =>{
        this.users = data.users;
      },
      err =>{
        this.flashMsg.show(err.json().msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  ngOnInit() {
  }
  deleteUser(user_id){
    this.adminServ.deleteUserById(user_id).subscribe(
      data =>{
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
        this.subToUser();
      },
      err =>{
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
  email:string;
  role:string;
  emailVerified:string;
}
