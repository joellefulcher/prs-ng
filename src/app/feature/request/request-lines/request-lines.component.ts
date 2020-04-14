import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { LineService } from 'src/app/service/line.items.service'; 
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})


export class RequestLinesComponent extends BaseComponent implements OnInit {
  title: string = 'Purchase Request Line Items';
  id: number = 0;
  request: Request;
  lineItems: LineItem[];
  lineItemId: number;
  delBool: boolean = false;
  products: Product[];
  message: string;

  constructor(private route: ActivatedRoute, private lineSvc: LineService,
              private reqSvc: RequestService, protected sysSvc: SystemService,
              private router: Router, private ProdSvc: ProductService) {
                super(sysSvc);
               }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id= parms['id']);
    this.lineSvc.listLinesByRequest(this.id).subscribe(jr => {
      let error: string = jr.errors;
      if(error != null) {
        this.message = jr.errors;
    }else {
      this.lineItems = jr.data as LineItem[];
    }
    });
  }
  deleteAction(lineId: number): void{
    this.delBool = true;
    this.lineItemId = lineId

  }

    submitRequest(): void {
      this.message='';
      this.reqSvc.submitRequest(this.request).subscribe(jr => {
        let error: string = jr.errors;
        if(error != null) {
          this.message = jr.errors;
        }else
        console.log(this.request);
          this.router.navigateByUrl('/request/detail/'+this.id);
      });
    }



 }
