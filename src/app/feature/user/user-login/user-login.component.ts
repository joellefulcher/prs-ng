import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { SystemService } from '../../../service/system.service';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user.class';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent extends BaseComponent implements OnInit {
  message: any;
  user: User = new User();

  constructor (private userSvc: UserService,
               protected sysSvc: SystemService,
               private router: Router) {
                  super(sysSvc);
  }

  ngOnInit() {
    //default user login for testing
    //this.user.userName = 'jfulcher';
    //this.user.password = 'calico';
    this.user.username = 'Joelle';
    this.user.password = 'Married';
    

    // initialize system user to null
    this.sysSvc.loggedInUser = null;

  }


  login() {
    console.log('login called for user: ', this.user);
    this.userSvc.login(this.user)
      .subscribe(jr => {
        if(jr.errors == null){
          this.user = jr.data as User;
          this.sysSvc.loggedInUser = this.user;
          this.router.navigateByUrl("/user/list");
          console.log(this.sysSvc.loggedInUser)
        } else {
          this.message = jr.errors;
        }

      });
  }


}
