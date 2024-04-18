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
          console.log(result);
          this.products = result;
        }
      });
    }


    productSelect(product: Product) {
  this.selectedProduct = product;
  console.log(this.selectedProduct + " productSelect metodu");
  console.log(this.selectedProduct);
  console.log(product);
  
}

    
  

dispatchProductFromShelf() { //deneme
  if(this.selectedProduct){
    console.log(this.selectedProduct.id + "seçilen ürün");
    
    let count = this.entryForm.get('count')!.value;
    this.productService.dispatchProduct(this.selectedProduct.id, count).subscribe({
      next: (result) => {
        console.log("result data " + result );
        
        this.toastr.info('Product dispatch successfuly.');
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

}