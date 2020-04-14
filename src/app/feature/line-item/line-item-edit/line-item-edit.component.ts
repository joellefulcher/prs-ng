import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { ActivatedRoute, Router } from '@angular/router';
import { LineService } from 'src/app/service/line.items.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent extends BaseComponent implements OnInit {
  id: number = 0;
  title: string = "Edit Item";
  lineItem: LineItem;
 
 
  constructor(private route: ActivatedRoute,
              private router: Router,
              private lineSvc: LineService,
              protected sysSvc: SystemService) {
              super(sysSvc);
  }
  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms["id"]);
    this.lineSvc.getLineItem(this.id).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
    });
  }
  
  save(): void {
    this.lineSvc.edit(this.lineItem).subscribe(jr => {
      let error: string = jr.errors;
      if (error != null) console.log(error);
    this.router.navigateByUrl("/request/detail/"+this.lineItem.request.id);
    });
  }
  delete(): void {
    this.lineSvc.delete(this.id).subscribe(jr => {
      let error: string = jr.errors;
      if(error!=null) console.log(error);
    this.router.navigateByUrl("/request/detail/"+this.lineItem.request.id);
    });
  }
}
