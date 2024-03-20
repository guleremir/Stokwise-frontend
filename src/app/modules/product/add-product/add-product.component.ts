import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../shared/dto/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  createForm = this.fb.nonNullable.group({
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productUnitInStock: 0,
    productMinimumCount:0,
    productDescription: "",
  })
  productID = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  submit() {
    let productName = this.createForm.get('productName')!.value;
    let productPrice = (this.createForm.get('productPrice')!.value);
    let productUnitInStock = (this.createForm.get('productUnitInStock')!.value);
    let productQuantity = (this.createForm.get('productQuantity')!.value);
    let productMinimumCount = (this.createForm.get('productMinimumCount')!.value);
    let productDescription = (this.createForm.get('productDescription')!.value);
    this.productService.addProduct(new Product(this.productID, productName, productPrice,productQuantity,productUnitInStock,productMinimumCount, productDescription )).subscribe({
      next: (result) => {
        this.toastr.info('Product created.');
        this.router.navigate(['..'], { relativeTo: this.route });
      }
    });
  }

}
