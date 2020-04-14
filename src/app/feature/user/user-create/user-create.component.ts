import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/user.class';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {
  title: string = 'User Create';
  submitBtnTitle: string = 'Create';
  user: User = new User();

  constructor(private userSvc: UserService,
              private router: Router) { } // navigates back to the user list page

  ngOnInit() {
    // do nothing
  }

  save() {
  
    this.userSvc.create(this.user).subscribe(jr => {
      let errs: string = jr.errors;
      if (errs != null) {
        console.log('Error creating user '+errs);
      }
      this.router.navigateByUrl('/user/list');
    });
  }

}
