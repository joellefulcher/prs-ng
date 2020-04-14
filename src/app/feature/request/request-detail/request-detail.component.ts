import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { BaseComponent } from 'src/app/base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { LineService } from 'src/app/service/line.items.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent extends BaseComponent implements OnInit {
  title: string = 'Request Detail';
  id: number;
  loggedInUser: User;
  request: Request;
  rejected: boolean = false;
  lineItems: LineItem[];
   

  constructor(protected sysSvc: SystemService,
              private route: ActivatedRoute,
              private reqSvc: RequestService,
              private router: Router,
              private lineSvc: LineService) {
                super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.reqSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
    });
    this.lineSvc.listLinesByRequest(this.id).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
    });
  }

  delete(): void {
    this.lineSvc.delete(this.id).subscribe(jr => {
      let msg: string = jr.errors;
      if (msg != null) {
        console.log(msg);
      }
      this.reqSvc.delete(this.id).subscribe(jr => {
        let err: string = jr.errors;
        if (err != null) {
          console.log(err);
        } else {
          this.router.navigateByUrl('/requests/list');
        }
      });

    });
  }

  submit(): void {
    this.reqSvc.submitRequest(this.request).subscribe(jr => {
      let err: string = jr.errors;
      if (err != null) {
        console.log(err);
      } else {
        this.router.navigateByUrl('/requests/list');
      }
    });
  }

  
}