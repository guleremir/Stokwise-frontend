import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../dto/product';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../dto/category';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: Product = new Product(0, '',new Category() , 0, 0, 0, 0,'');
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
    private toastr: ToastrService
  ) {}

  deleteProduct() {
    this.delete.emit(this.product);
  }
  editProduct() {
    this.edit.emit(this.product);
  }
}
