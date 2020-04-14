import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { ActivatedRoute, Router } from '@angular/router';
import { LineService } from 'src/app/service/line.items.service';
import { RequestService } from 'src/app/service/request.service';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';


@Component({
  selector: 'app-request-add-lines',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent extends BaseComponent implements OnInit {
  title: string = "Add Items to Request";
  id: number = 0;  
  lineItem:LineItem = new LineItem();
  products: Product[] = [];
  productExists: boolean = false;
  message: string;


  constructor(private route: ActivatedRoute,
              private lineSvc: LineService,
              private prodSvc: ProductService,
              private reqSvc: RequestService,
              protected sysSvc: SystemService,
              private router: Router) {
              super(sysSvc)
     }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms["id"]);
    this.reqSvc.get(this.id).subscribe(jr => {
      let error: string = jr.errors;
      if(error!=null){
        console.log(error);
      }
      this.lineItem.request = jr.data;
    });
    this.prodSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }
  save():void{
      this.message="";
      this.lineSvc.create(this.lineItem).subscribe(jr => {
        let error:string = jr.errors;
        if(error!=null){
          this.message = jr.errors;
        } else
          console.log(this.lineItem)
           this.router.navigateByUrl("/request/detail/"+this.id);
      });
  }
  contains():void {
    this.lineSvc.listLinesByRequest(this.lineItem.request.id).subscribe(jr => {
      let lineItems: LineItem[] = jr.data as LineItem[];
      for(let lineItem of lineItems){
        if(this.lineItem.product.id == lineItem.product.id){
           this.productExists = true;
        }
      }
    });
  }

}
