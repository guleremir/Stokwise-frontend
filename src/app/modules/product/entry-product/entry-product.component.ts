import { Component } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-product',
  templateUrl: './entry-product.component.html',
  styleUrl: './entry-product.component.scss'
})
export class EntryProductComponent {

  areYouSureQuestion = 'Are you sure you want to place this product ?'
  
  products: Product[] = [];
  selectedProduct: Product | null = null;
  entryForm = this.fb.nonNullable.group({
    count: 0
  });
  
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    ) { }
    ngOnInit(): void {
      this.productService.getAllProduct().subscribe({
        next: (result) => {
          console.log(result);
          this.products = result;
        }
      });
    }
  
  addProductToShelf() {
    if (this.selectedProduct) {
      let count = this.entryForm.get('count')!.value;
      this.productService.acceptProduct(this.selectedProduct.id, count).subscribe({
        next: (result) => {
          this.toastr.info('Product Successfully Placed !');
          this.router.navigate(['/homepage/shelves']);
        },
        error: (err) => {
          console.log(err);
            this.toastr.error(err.error);
          
        }
      });
    }
  }

  productSelect(product: Product) {
    this.selectedProduct = product;
    console.log(this.selectedProduct + " productSelect metodu");
    console.log(product);
  }

  cancel() {
    this.router.navigate(['/homepage/shelves']);
  }

  hasCountError():boolean{
    return this.entryForm.value.count! > (this.selectedProduct?.quantity! - this.selectedProduct?.unitInStock!);
  }

  countCannotBeEmpty():boolean{
    return this.entryForm.value.count! === 0 ;
  }

  emptyAndCountError():boolean{
    return this.hasCountError() || this.countCannotBeEmpty();
  }

  placeProduct(){
    this.addProductToShelf();
  }

  clearFieldOnFocus(fieldName: string) {
    const currentValue = this.entryForm.get(fieldName)!.value;
    if (currentValue === 0) { // Sadece değer 0 ise boşalt
      this.entryForm.get(fieldName)!.setValue('');
    }
  }

}

