import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent extends BaseComponent implements OnInit {
  id: number = 0;
  title: string = "Edit Request";
  request: Request = new Request(); 


  constructor(private reqSvc: RequestService,
              private router: Router,
              protected sysSvc: SystemService,
              private route: ActivatedRoute) { 
              super(sysSvc);
    }

    ngOnInit() {
      super.ngOnInit();
      this.route.params.subscribe(parms => this.id = parms["id"]);
      this.reqSvc.get(this.id).subscribe(jr => {
        let error: string = jr.errors;
        if(error!=null){
          console.log(error);
        }
        this.request = jr.data;
      });
      
    }
    save():void {
      this.reqSvc.edit(this.request).subscribe(jr => {
        let error = jr.errors;
        if(error!=null){
          console.log(error);
        }
        this.router.navigateByUrl("/request/list");
      });
    }
    delete() {
      this.reqSvc.delete(this.id).subscribe(jr => {
        console.log("request delete jr:",jr);
        if (jr.errors != null) {
          console.log("Error deleting request: "+jr.errors);
        }
        this.router.navigateByUrl("request/list");
    });
  }
}
