import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product-management/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EntryProductComponent } from './entry-product/entry-product.component';
import { DispatchProductComponent } from './dispatch-product/dispatch-product.component';

const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' },
  { path: 'addProduct', component: AddProductComponent},
  { path: 'editProduct', component: EditProductComponent},
  { path: 'entry', component: EntryProductComponent},
  { path: 'dispatch', component: DispatchProductComponent},

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
