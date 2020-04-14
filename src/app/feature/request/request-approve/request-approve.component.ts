import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent extends BaseComponent implements OnInit {
  id: number = 0;
  title:string ="Request Review";
  request: Request;
  rejectBool: boolean =  false;


  constructor(protected sysSvc: SystemService,
              private reqSvc: RequestService,
              private route: ActivatedRoute,
              private router: Router) {
              super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms["id"]);
    this.reqSvc.get(this.id).subscribe(jr => {
      this.request = jr.data;
    });
  }

  approve():void {
    this.reqSvc.approvedRequest(this.request).subscribe(jr => {
      let error: string = jr.errors;
      if(error!=null){
        console.log(error);
      }else {
        this.router.navigateByUrl("/request/review");
      }
    });
  }

  checkReject(): void {
    if (this.rejectBool == false) 
      this.rejectBool = true;
    else
      this.reject();
  }

  reject():void {
    this.reqSvc.rejectRequest(this.request).subscribe(jr => {
      let error: string = jr.errors;
      if(error!=null){
        console.log(error);
      }else {
        this.router.navigateByUrl("/request/review");
      }
    });
  }

}