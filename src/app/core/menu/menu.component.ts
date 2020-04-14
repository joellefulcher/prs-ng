import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';

import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from 'src/app/base/base.component';
import { Menu } from 'src/app/model/menu.class';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  // navbarOpen: false;
  // user: User;
  menuItems: Menu[] = [
    new Menu('Home', 'This is the home page of the PRS application.'),
    new Menu('About', '/about', 'This is the about page for the purchase request system.'),
    new Menu('User', '/user/list', 'This is the list of users.'),
    new Menu('Vendor', '/vendor/list', 'This is the list of vendors.'),
    new Menu('Product', '/product/list', 'This is the list of products available for request.'),
    new Menu('Request', '/request/list', 'This is the purchase request page.'),
    new Menu('Review', '/request/review', 'This is the review page for the purchase requests'),
    // new Menu('Login', '/login', 'This is the user login page.'),
  ];

  //toggleNavbar() {
  //  this.
  //}

  constructor(protected sysSvc: SystemService) { 
          super(sysSvc);
          console.log('menu component constructor');
  }

  ngOnInit() {
    super.ngOnInit;
  }
}
