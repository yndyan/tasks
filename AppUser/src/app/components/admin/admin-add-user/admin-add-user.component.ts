import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { URLSearchParams } from '@angular/http';
import { HelpService } from '../../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})

export class AdminAddUserComponent implements OnInit {

  user: User_t = {
    username: "",
    email: "",
    password : ""
  }
  constructor(private adminServ: AdminService,private helpServ: HelpService, private flashMsg: FlashMessagesService
  ) { }
  
  ngOnInit() {
  }

  onAddSubmit(){
    // console.log(this.user);
    this.adminServ.addUser(this.helpServ.genUrlSearchParams(this.user))
      .subscribe(
        data => {
          console.log(data);
          this.flashMsg.show(data.msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
          this.user.username = '';
          this.user.password = '';
          this.user.email = '';
        },
        err =>{
          console.log(err);
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
