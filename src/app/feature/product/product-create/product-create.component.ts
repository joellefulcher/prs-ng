import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title: string = 'New Product';
  product: Product = new Product();
  vendors: Vendor[] = [];

  constructor(private prodSvc: ProductService,
              private venSvc: VendorService,
              private router: Router) {}
              



  ngOnInit() {
    this.venSvc.list().subscribe(jr => {
      let error: string = jr.errors;
      if(error != null){
        console.log('Error saving vendor '+error);
      }
      this.vendors = jr.data;
    });
  }


  save(): void {
    this.prodSvc.create(this.product).subscribe(jr=>{
    let error: string = jr.errors;
    if (error !=null) {
      console.log('Error saving product '+error);
    }
    this.router.navigateByUrl('/product/list')
    });
  }


  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}