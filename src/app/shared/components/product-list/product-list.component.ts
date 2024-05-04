import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Product } from '../../dto/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() loadProductEvent=new EventEmitter<void>();
  @Input() uuidToSequenceMap: { [key: string]: number} = {};
  @Input() products: Product[] = [];

  selectedProduct: Product | null = null;
  areYouSureQuestion = 'Are you sure you want to delete this product?'

  constructor(
    //private toastr: ToastrService
  ) {}

  loadProduct(){
    this.loadProductEvent.emit();
  }
  deleteProduct() {
    this.delete.emit(this.selectedProduct);
  }
  editProduct(product: Product) {
    this.edit.emit(product);
  }
  hasQuantityError(product: Product):boolean{
    return product.minimumCount! >= product.quantity!;
  }
  selectProduct(product: Product) {
  this.selectedProduct = product;
  }
}
