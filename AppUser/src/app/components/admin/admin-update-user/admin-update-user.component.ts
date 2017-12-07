import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { URLSearchParams } from '@angular/http';
import { HelpService } from '../../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent implements OnInit {

  userId:any;
  basicArrayOfKeys:any;
  passArrayOfKeys:any;
  user: User_t = {
    basic: {
      username:'',
      email:'',
      role:''
    },
    pass: {
      password: '',
      confirm_password: ''
    }
  }
  
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private adminServ:AdminService,
    private helpServ: HelpService,
    private flashMsg: FlashMessagesService
  ) {
    this.basicArrayOfKeys = Object.keys(this.user.basic);
    this.passArrayOfKeys = Object.keys(this.user.pass);
    this.route.params.subscribe((params:Params)=>{
        this.userId = params.userId
        this.subToUser();
    });
  }
  
  subToUser(){
    this.adminServ.getUser(this.userId).subscribe(
      data =>{
        console.log(data);
        this.helpServ.smartCopy(this.user.basic, data.user);
      },
      err =>{
        console.log(err);
        this.flashMsg.show(err.json().msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  ngOnInit() {
  }

  onUpdateUserSubmit(){
    // TODO add fronend parameters verification
    this.adminServ.updateUser(this.userId, this.helpServ.genUrlSearchParams(this.user.basic))
      .subscribe(
        data => {
          console.log(data);
          this.subToUser();
          this.flashMsg.show(data.msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
        },
        err =>{
          this.flashMsg.show(err.json().msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
          this.subToUser();
        }
      );
  }

  onUpdatePasswordSubmit(){
    if((this.user.pass.password != '') && (this.user.pass.password == this.user.pass.confirm_password)){//TODO add password and other validation on client side
      this.adminServ.updateUserPassword(this.userId, this.helpServ.genUrlSearchParams(this.user.pass))
        .subscribe(
          data => {
            console.log(data);
            this.flashMsg.show(data.msg, {
              classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
              timeout: 2500, // Default is 3000
            });
            
          },
          err =>{
            this.flashMsg.show(err.json().msg, {
              classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
              timeout: 2500, // Default is 3000
            });
            
          }
      );
    } else {
      this.flashMsg.show("please enter same username and password", {
        classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
        timeout: 2500, // Default is 3000
      });
    }
  }
}


interface User_t {
  basic: {
    username:string;
    email:string;
    role:string;
  },
  pass: {
    password: string;
    confirm_password: string;
  }
  
}
