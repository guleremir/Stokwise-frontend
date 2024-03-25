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
          this.products = result;
        }
      });
    }
    submit() {
      if (this.selectedProduct) {
        let count = this.entryForm.get('count')!.value;
      this.productService.acceptProduct(this.selectedProduct.id, count).subscribe({
        next: (result) => {
          this.toastr.info('Product successfully placed.');
          this.router.navigate(['/menu']);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Something went wrong.');
        }
      });
    }
  }
  productSelect(product: Product) {
    this.selectedProduct = product;
  }
}
