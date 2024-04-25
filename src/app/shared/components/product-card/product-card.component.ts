import { Product } from './../../dto/product';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../dto/category';
import { MatDialog } from '@angular/material/dialog';
import { AreYouSureComponent } from '../are-you-sure/are-you-sure.component';

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

  constructor(
    //private toastr: ToastrService
    // private dialog: MatDialog
  ) {}

  deleteProduct(id: string) {
    this.delete.emit(this.product);
  }
  editProduct() {
    this.edit.emit(this.product);
  }

  hasQuantityError():boolean{
    return this.product.minimumCount! >= this.product.quantity!;
  }

  // deleteProductButtonClicked(){
  //   let dialog = this.dialog.open(AreYouSureComponent, {
  //     width: '300px',
  //     enterAnimationDuration: '250ms',
  //     exitAnimationDuration: '250ms',
  //   });
  //   dialog.afterClosed().subscribe({
  //     next: (data) => {
  //       if (data?.result === 'yes') {
  //         this.deleteProduct();
  //       }
  //     }
  //   });
  //   dialog.componentInstance.question = 'Are you sure for delete this fruit?';
  // }


}
