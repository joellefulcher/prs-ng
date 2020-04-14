import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { BaseComponent } from 'src/app/base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent extends BaseComponent implements OnInit {
  title:string ='Product List';
  products: Product[] = [];
  
  constructor(private prodSvc: ProductService,
              protected sysSvc: SystemService) {
              super(sysSvc);
  
  }


  ngOnInit() {
    super.ngOnInit();
    this.prodSvc.list().subscribe( jr => {
      let error: string = jr.errors;
      if(error !=null){
        console.log('Error getting list');
      }
        this.products = jr.data as Product[];  
    });
  }
}