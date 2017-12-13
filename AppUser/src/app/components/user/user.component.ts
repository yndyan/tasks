import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HelpService } from '../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User_t = {
    username:'',
    email:'',
    emailVerified:'',
    role:''
  }
  arrayOfKeys:any;
  constructor(private userServ: UserService, private helpServ: HelpService,private flashMsg: FlashMessagesService) {
    this.arrayOfKeys = Object.keys(this.user);
    this.userServ.getUser().subscribe(
      data=> {
        this.helpServ.smartCopy(this.user,data.user);
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
    );
  }
  ngOnInit() {
  }

}

interface User_t {
  username:string;
  email:string;
  emailVerified:string;
  role:string;
}
