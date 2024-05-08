import { Component } from '@angular/core';
import { Product } from '../../../shared/dto/product';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';

@Component({
  selector: 'app-dispatch-product',
  templateUrl: './dispatch-product.component.html',
  styleUrl: './dispatch-product.component.scss'
})
export class DispatchProductComponent {

  areYouSureQuestion = 'Are you sure you want to dispatch this product ?'

  products: Product[] = [];
  selectedProduct: Product | null = null;
  entryForm = this.fb.nonNullable.group({
    count: 0
  });

  constructor(
    private productService : ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    ) { }

    ngOnInit(): void {
      this.productService.getAllProductsFromShelves().subscribe({
        next: (result) => {
          this.products = result;
        }
      });
    }

  productSelect(product: Product) {
  this.selectedProduct = product;
  }

  dispatchProductFromShelf() { //deneme
    if(this.selectedProduct){
      let count = this.entryForm.get('count')!.value;
      this.productService.dispatchProduct(this.selectedProduct.id, count).subscribe({
        next: () => {
          this.toastr.info('Product Successfully Dispatch !');
          this.router.navigate(['/homepage/shelves']);
        },
        error: (err) => {
          console.log(err);
            this.toastr.error(err.error);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/homepage/shelves']);
  }

  hasCountError():boolean{
    return this.entryForm.value.count! > this.selectedProduct?.unitInStock!;
  }

  countCannotBeEmpty():boolean{
    return this.entryForm.value.count! === 0 ;
  }

  emptyAndCountError():boolean{
    return this.hasCountError() || this.countCannotBeEmpty();
  }

  dispatchProduct(){
    this.dispatchProductFromShelf();
  }
  clearFieldOnFocus(fieldName: string) {
    const currentValue = this.entryForm.get(fieldName)!.value;
    if (currentValue === 0) { // Sadece değer 0 ise boşalt
     this.entryForm.get(fieldName)!.setValue('');
    }
  }
}