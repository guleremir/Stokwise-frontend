import { Product } from './../../dto/product';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../dto/category';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  
  @Input() product: Product = new Product("", '',new Category() , 0, 0, 0, 0,'');
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Input() productList: any[] = [] ;

  constructor() {}

  deleteProduct(id: string) {
    this.delete.emit(this.product);
  }
  
  editProduct() {
    this.edit.emit(this.product);
  }

  hasQuantityError():boolean{
    return this.product.minimumCount! >= this.product.quantity!;
  }
}
