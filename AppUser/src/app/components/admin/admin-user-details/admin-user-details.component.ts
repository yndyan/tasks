import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { HelpService } from '../../../services/help.service';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {

  user:any;
  arrayOfKeys:any;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private adminServ: AdminService,
    private flashMsg: FlashMessagesService
    ) {
    this.route.params.subscribe((params:Params)=>{
      this.adminServ.getUser(params.userId).subscribe(
        data=>{
          this.user = data.user;
          this.arrayOfKeys = Object.keys(this.user);
        },
        err =>{
          console.log(err);
          this.flashMsg.show(err.json().msg, {
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






