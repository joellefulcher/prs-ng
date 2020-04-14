import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';




@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})


export class VendorDetailComponent extends BaseComponent implements OnInit {
  id: number = 0;
  title: string = 'Vendor Detail List'
  vendor: Vendor = new Vendor;

  constructor(private vendorSvc: VendorService,
              protected sysSvc: SystemService,
              private route: ActivatedRoute,
              private router: Router) { 
                super(sysSvc);
              }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.vendorSvc.get(this.id).subscribe(jr => {
      this.vendor = jr.data as Vendor;
      console.log(this.vendor);
    });
  }

  delete(): void {
    this.vendorSvc.delete(this.vendor.id).subscribe(jr => {
      console.log('Vendor deleted', jr);
      let error: string = jr.errors;
      if (error != null) {
        console.log('Error deleting vendor '+error);
      }
      this.router.navigateByUrl('vendor/list');
    });
  }


}
