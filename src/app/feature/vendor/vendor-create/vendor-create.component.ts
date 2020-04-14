import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})

export class VendorCreateComponent implements OnInit {
  title: string = 'Vendor Create';
  submitBtnTitle: string = 'Create';
  vendor: Vendor = new Vendor();

  constructor(private vendorSvc: VendorService,
              private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.vendorSvc.create(this.vendor).subscribe(jr => {
      let error: string = jr.errors;
      if (error != null) {
          console.log('Error creating vendor '+error);
      }
      this.router.navigateByUrl('vendor/list');
    });
  }


}
