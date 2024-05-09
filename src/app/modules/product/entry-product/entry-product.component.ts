import { Component } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
 
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
  filteredProducts: Product[] = []; // Filtrelenmiş ürün listesi
  filterQuery: string = ''; // Arama çubuğundan gelen girdi
  productInput = new Subject<string>();

  
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    ) { }

    ngOnInit(): void {
      this.productService.getAllProduct().subscribe({
        next: (products) => {
          this.products = products;
          this.filteredProducts = products;
        }
      });
    }

    onSearch(event: { term: string; items: any[] }) {
      this.filterProducts(event.term);
    }

    filterProducts(term: string): void {
      if (!term) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      }
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

