import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductManagementComponent } from './admin-product-management/admin-product-management.component';
import { EditProductComponent } from '../product/edit-product/edit-product.component';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminShelfManagementComponent } from './admin-shelf-management/admin-shelf-management.component';

const routes: Routes = [
  { path: 'products', component: AdminProductManagementComponent, pathMatch: 'full' },
  { path: 'editProduct', component: AdminEditProductComponent, pathMatch: 'full' },
  { path: 'addProduct', component: AdminAddProductComponent, pathMatch: 'full' },
  { path: 'shelves', component: AdminShelfManagementComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
