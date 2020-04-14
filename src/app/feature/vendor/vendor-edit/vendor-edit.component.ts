import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';



@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})


export class VendorEditComponent implements OnInit {
  id: number = 0;
  title: string = 'Vendor Edit';
  submitBtnTitle: string = 'Save';
  vendor: Vendor = new Vendor();

  constructor(private vendorSvc: VendorService,
              private route: ActivatedRoute,
              private router: Router) { 
         
    }

    ngOnInit() {
        this.route.params.subscribe(parms => this.id = parms['id']);
        this.vendorSvc.get(this.id).subscribe(jr => {
        this.vendor = jr.data as Vendor;
        console.log(this.vendor);
      });
    }

    delete() {
      this.vendorSvc.delete(this.id).subscribe(jr => {
        console.log('Vendor deleted', jr);

        let error: string = jr.errors;
        if (error != null) {
        console.log('Error creating vendor '+error);
       }
      this.router.navigateByUrl('vendor/list');
    });
  }

    save(): void {
      this.vendorSvc.edit(this.vendor).subscribe(jr => {

        let error: string = jr.errors;
        if (error != null) {
          console.log('Error creating vendor '+error);
        }
        this.router.navigateByUrl('vendor/list');
      });
    }


}
