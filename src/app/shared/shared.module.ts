import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FilterPipe } from './pipe/filter.pipe';
import { AreYouSureComponent } from './components/are-you-sure/are-you-sure.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductListComponent,
    UserListComponent,
    FilterPipe,
    AreYouSureComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ProductCardComponent,
    ProductListComponent,
    UserListComponent,
    AreYouSureComponent
  ]
})
export class SharedModule { }
