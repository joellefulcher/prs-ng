import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { RequestReviewComponent } from './feature/request/request-review/request-review.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { RequestApproveComponent } from './feature/request/request-approve/request-approve.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineItemCreateComponent } from './feature/line-item/line-item-create/line-item-create.component';
import { LineItemEditComponent } from './feature/line-item/line-item-edit/line-item-edit.component';
import { RequestLinesComponent } from './feature/request/request-lines/request-lines.component';





const routes: Routes = [
    { path: "", redirectTo: "/users/list", pathMatch: "full"},
    { path: 'user/login', component: UserLoginComponent },
    { path: "user/list", component: UserListComponent},
    { path: "user/create", component: UserCreateComponent},
    { path: "user/detail/:id", component: UserDetailComponent},
    { path: "user/edit/:id", component: UserEditComponent},
    { path: "vendor/list", component: VendorListComponent},
    { path: "vendor/create", component: VendorCreateComponent},
    { path: "vendor/detail/:id", component: VendorDetailComponent},
    { path: "vendor/edit/:id", component: VendorEditComponent},
    { path: "product/list", component: ProductListComponent},
    { path: "product/create", component: ProductCreateComponent},
    { path: "product/detail/:id", component: ProductDetailComponent},
    { path: "product/edit/:id", component: ProductEditComponent},
    { path: "request/list", component:RequestListComponent},
    { path: "request/review", component:RequestReviewComponent},
    { path: "request/edit/:id", component:RequestEditComponent},
    { path: "request/detail/:id", component:RequestDetailComponent},
    { path: "request/create", component:RequestCreateComponent},
    { path: "request/lines/:id", component: RequestLinesComponent},
    { path: "request/approve/:id", component:RequestApproveComponent},
    { path: "lineitem/lineitemcreate/:id", component:LineItemCreateComponent},
    { path: "lineitem/lineitemedit/:id", component:LineItemEditComponent},
    { path: "**", component:UserListComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
