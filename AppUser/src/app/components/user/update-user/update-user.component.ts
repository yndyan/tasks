import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../services/user.service'
import { HelpService } from '../../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user:User_t = {
    basic: {
      email: ''
    },
    pass: {
      password: '',
      confirm_password: ''
    }
  };
  basicArrayOfKeys:any;
  passArrayOfKeys:any;

  constructor(private userServ:UserService, private helpServ: HelpService,private flashMsg: FlashMessagesService) {

      this.basicArrayOfKeys = Object.keys(this.user.basic);
      this.passArrayOfKeys = Object.keys(this.user.pass);
      this.subToUser();
  }

  ngOnInit() {
  }
  subToUser(){
    this.userServ.getUser()
    .subscribe(
      data =>{
        this.helpServ.smartCopy(this.user.basic,data.user);
      },
      err =>{
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      }
    );
  }


  onUpdateUserSubmit(){
    this.userServ.updateUser(this.helpServ.genUrlSearchParams(this.user.basic))
     .subscribe(
      data=> {
        console.log(data);
        this.flashMsg.show(data.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
      },
      err=> {
        console.log(err);
        this.flashMsg.show(err.msg, {
          classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
          timeout: 2500, // Default is 3000
        });
        this.subToUser();
      }
    );
  }


  onUpdatePasswordSubmit(){
    if((this.user.pass.password != '') && (this.user.pass.password === this.user.pass.confirm_password)){//TODO add password and other validation on client side
      this.userServ.updateUserPassword(this.helpServ.genUrlSearchParams(this.user.pass))
       .subscribe(
         data => {
          console.log(data);
          this.flashMsg.show(data.msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
        },
        err=> {
          console.log(err);
          this.flashMsg.show(err.msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
        }
      );
    } else {
      this.flashMsg.show("Please enter password and confirm same password", {
        classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
        timeout: 2500, // Default is 3000
      });
    }

  }

}

interface User_t {
  basic: {
    email:string
  },
  pass: {
    password: string,
    confirm_password: string
  }
  
}
