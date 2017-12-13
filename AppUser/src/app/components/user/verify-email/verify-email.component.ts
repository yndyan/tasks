import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from "../../../services/user.service";
import { HelpService} from "../../../services/help.service";
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userSerw : UserService,
    private helpServ: HelpService,
    private flashMsg: FlashMessagesService
  ) {
    this.route.params.subscribe((params:Params)=>{
      const verifycode = { "verifycode" : params.verifyCode};
      this.userSerw.verifyEmail(this.helpServ.genUrlSearchParams(verifycode)).subscribe(
        data=> {
          console.log(data);
          this.flashMsg.show(data.msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
          this.router.navigate(['user/login']);
        },
        err =>{
          this.flashMsg.show(err.msg, {
            classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
            timeout: 2500, // Default is 3000
          });
        }
      );
    });
  }

  ngOnInit() {
  }

}
