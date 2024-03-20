import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product-management/product.component';

const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' },
  { path: 'addProduct', component: AddProductComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
