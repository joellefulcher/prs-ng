import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string = 'User Edit';
  submitBtnTitle = 'Save';
  id: number = 0;
  user: User = new User();

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.userSvc.get(this.id).subscribe(jr => {
      this.user =jr.data as User;
      console.log(this.user);
    });
  }

  delete() {
    this.userSvc.delete(this.id).subscribe(jr => {
      console.log('user delete jr: ', jr);
      if (jr.errors !=null) {
        console.log('Error deleting user '+jr.errors);
      }
      this.router.navigateByUrl('user/list');
    });
  }


  save(): void {
    this.userSvc.edit(this.user).subscribe(jr => {
      let errs: string = jr.errors;
      if (errs != null) {
        console.log('Error creating user '+errs);
      }
      this.router.navigateByUrl('user/list');
    });
  }

}
