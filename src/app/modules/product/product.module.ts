import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product-management/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EntryProductComponent } from './entry-product/entry-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    EntryProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
