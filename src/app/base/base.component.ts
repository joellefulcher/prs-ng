import { Component, OnInit } from '@angular/core';
import { SystemService } from '../service/system.service';
import { User } from '../model/user.class';

@Component({
// selector: 'app-base',
  //templateUrl: './base.component.html',
 // styleUrls: ['./base.component.css'],
  template: ''
})
export class BaseComponent implements OnInit {
 // sortColumn: string = 'id';
 // ascOrder: boolean = true;
  loggedInUser: User = null;
  isAdmin: boolean;
  isReviewer: boolean;


  constructor(protected sysSvc: SystemService) { }

  ngOnInit() {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.sysSvc.isAdmin();
    this.isReviewer = this.sysSvc.isReviewer(); 
  }

  // sort(column: string): void{
  //   if (this.sortColumn === column) {
  //     this.ascOrder = !this.ascOrder;
  //     return;
  //   }
  //   this.ascOrder = true;
  //   this.sortColumn = column;
  // }

}
