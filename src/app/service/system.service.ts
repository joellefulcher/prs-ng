import { Injectable } from '@angular/core';
import { User } from '../model/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User;

  constructor(private router: Router) { 
    
  }

  checkLogin(): void {
    if(this.loggedInUser == null) {
      this.router.navigateByUrl("/users/login");
    }
    //throw new Error("Method not implemented.");
  }

  isAdmin(): boolean {
    return (this.loggedInUser == null) ? false : this.loggedInUser.admin;
  }

  isReviewer(): boolean {
    return (this.loggedInUser == null) ? false : this.loggedInUser.reviewer;
  }


}
