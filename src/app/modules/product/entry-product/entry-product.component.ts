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
          console.log(result);
          this.products = result;
        }
      });
    }
  //   
  
  addProductToShelf() {
    if (this.selectedProduct) {
      let count = this.entryForm.get('count')!.value;
      this.productService.acceptProduct(this.selectedProduct.id, count).subscribe({
        next: (result) => {
          this.toastr.info('Product successfully placed.');
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

}

// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { ProductService } from '../../../shared/service/product.service'; // ProductService'nin doğru yolunu belirtmelisiniz

// @Component({
//   selector: 'app-entry-product',
//   templateUrl: './entry-product.component.html',
//   styleUrls: ['./entry-product.component.scss']
// })
// export class EntryProductComponent {
//   entryForm: FormGroup;
//   selectedProduct: any;
//   products: any[] = []; // Bu, ürünlerinizi içeren diziyi temsil etmelidir

//   constructor(
//     private formBuilder: FormBuilder,
//     private productService: ProductService, // ProductService'yi enjekte edin
//     private toastr: ToastrService,
//     private router: Router
//   ) {
//     this.entryForm = this.formBuilder.group({
//       count: ['']
//     });
//   }

//   addProductToShelf() {
//     if (this.selectedProduct) {
//       let count = this.entryForm.get('count')!.value;
//       this.productService.acceptProduct(this.selectedProduct.id, count).subscribe({
//         next: (result) => {
//           // Ürünü raflara ekledikten sonra stok miktarını azalt
//           this.productService.decreaseProductStock(this.selectedProduct.id, count).subscribe({
//             next: (result) => {
//               this.toastr.info('Product successfully placed.');
//               this.router.navigate(['/homepage/shelves']);
//             },
//             error: (err) => {
//               console.log(err);
//               this.toastr.error('An error occurred while updating product stock.');
//             }
//           });
//         },
//         error: (err) => {
//           console.log(err);
//           if (err.status === 409) {
//             this.toastr.error('Not enough space on the shelf.');
//           } else {
//             this.toastr.error('An error occurred while placing the product.');
//           }
//         }
//       });
//     }
//   }

//   productSelect(product: any) {
//     this.selectedProduct = product;
//   }
// }
