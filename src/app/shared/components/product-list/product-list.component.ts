import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Product } from '../../dto/product';
import { Category } from '../../dto/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() product: Product = new Product("", '',new Category() , 0, 0, 0, 0,'');
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
@Output() loadProductEvent=new EventEmitter<void>();
@Input() uuidToSequenceMap: { [key: string]: number} = {};

loadProduct(){
  this.loadProductEvent.emit();
}

  constructor(
    //private toastr: ToastrService
  ) {}

  deleteProduct() {
    this.delete.emit(this.product);
  }
  editProduct() {
    this.edit.emit(this.product);
  }

  hasQuantityError():boolean{
    return this.product.minimumCount! >= this.product.quantity!;
  }
  

}
