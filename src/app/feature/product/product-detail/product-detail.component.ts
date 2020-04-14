import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  id: number = 0;
  title: string = 'Product Details';
  product: Product = new Product();


  constructor(private prodSvc: ProductService,
              protected sysSvc: SystemService,
              private route: ActivatedRoute,
              private router: Router) {
              super(sysSvc);
               }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms["id"]);
    this.prodSvc.get(this.id).subscribe(jr => { 
      this.product = jr.data as Product;
    });
  }
  delete():void {
    this.prodSvc.delete(this.id).subscribe(jr => {
      let error: string = jr.errors;
      if(error!=null){
        console.log("Unable to delete product" +error);
      }
      this.router.navigateByUrl("/product/list");
    });
  }
 
}
