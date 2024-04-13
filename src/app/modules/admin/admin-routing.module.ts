import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductManagementComponent } from './admin-product-management/admin-product-management.component';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminShelfManagementComponent } from './admin-shelf-management/admin-shelf-management.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';

const routes: Routes = [
  { path: '', component: AdminProductManagementComponent, pathMatch: 'full' },
  { path: 'editProduct', component: AdminEditProductComponent},
  { path: 'addProduct', component: AdminAddProductComponent},
  { path: 'shelves', component: AdminShelfManagementComponent},
  { path: 'users', component: AdminUserManagementComponent},
  { path: 'users/addUser', component: AdminAddUserComponent},
  { path: 'users/editUser', component: AdminEditUserComponent},
  { path: 'account', component: AdminAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
