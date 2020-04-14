import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { Product } from 'src/app/model/product.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})


export class ProductEditComponent implements OnInit {
  title: string ='Product Edit';
  submitBtnTitle: string = 'Save';
  id: number = 0;
  product: Product = new Product();
  vendors: Vendor[]=[];

  constructor(private prodSvc: ProductService,
              private venSvc: VendorService,
              private route: ActivatedRoute,
              private router: Router) { }



ngOnInit(){
  this.route.params.subscribe(parms => this.id = parms['id']);
  this.venSvc.list().subscribe(jr => { 
    this.vendors = jr.data as Vendor[];
    this.prodSvc.get(this.id).subscribe( jr => {
    this.product = jr.data as Product;
    });
  });
}
save():void {
 this.prodSvc.edit(this.product).subscribe(jr =>{
   let errors: string = jr.errors;
   if (errors!=null) {
     console.log('Error creating product '+ errors);
    }
  this.router.navigateByUrl('/product/list');
    });
  }
    delete() {
      this.prodSvc.delete(this.id).subscribe(jr => {
        console.log('product delete jr ',jr);
        if (jr.errors != null) {
          console.log('Error deleting product '+jr.errors);
        }
        this.router.navigateByUrl('product/list');
    });
    
}
  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
