import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product-management/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EntryProductComponent } from './entry-product/entry-product.component';
import { DispatchProductComponent } from './dispatch-product/dispatch-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ROLE_WAREHOUSE_SUPERVISOR } from '../../shared/model/constant';
import { roleCheckGuard } from '../../shared/guard/role-check.guard';

const routes: Routes = [
  { path: '', title:'Stokwise - Product', component: ProductComponent, pathMatch: 'full' },
  { path: 'addProduct', component: AddProductComponent, canActivate:[roleCheckGuard(ROLE_WAREHOUSE_SUPERVISOR)]},
  { path: 'editProduct', component: EditProductComponent, canActivate:[roleCheckGuard(ROLE_WAREHOUSE_SUPERVISOR)]},
  { path: 'addCategory', component: AddCategoryComponent, canActivate:[roleCheckGuard(ROLE_WAREHOUSE_SUPERVISOR)]},
  { path: 'entry', component: EntryProductComponent, canActivate:[roleCheckGuard(ROLE_WAREHOUSE_SUPERVISOR)]},
  { path: 'dispatch', component: DispatchProductComponent, canActivate:[roleCheckGuard(ROLE_WAREHOUSE_SUPERVISOR)]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
