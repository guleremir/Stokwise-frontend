import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../shared/dto/product';
import { Category } from '../../../shared/dto/category';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {

  createForm = this.fb.nonNullable.group({
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productUnitInStock: 0,
    productMinimumCount: 0,
    productDescription: "",
  })
  productCategory = "";
  productID = 0;
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    // console.log(this.productService.editingProduct);
    if (this.productService.editingProduct != null) {
      this.productID = this.productService.editingProduct.id;
      this.productCategory = this.productService.editingProduct.category.name;
      this.createForm.setValue({
        productName: this.productService.editingProduct.name,
        productPrice: this.productService.editingProduct.price,
        productQuantity: this.productService.editingProduct.quantity,
        productUnitInStock: this.productService.editingProduct.unitInStock,
        productMinimumCount: this.productService.editingProduct.minimumCount,
        productDescription: this.productService.editingProduct.description,
      });
      // console.log(this.productService.editingProduct);
    } else { }
  }

  submit() {
    console.log(this.productService.editingProduct);
    let productName = this.createForm.get('productName')!.value;
    let productPrice = (this.createForm.get('productPrice')!.value);
    let productUnitInStock = (this.createForm.get('productUnitInStock')!.value);
    let productQuantity = (this.createForm.get('productQuantity')!.value);
    let productMinimumCount = (this.createForm.get('productMinimumCount')!.value);
    let productDescription = (this.createForm.get('productDescription')!.value);
    this.productService.editProduct(new Product(this.productID, productName, new Category(0,this.productCategory) ,productPrice, productQuantity, productUnitInStock, productMinimumCount, productDescription)).subscribe({
      next: (result) => {
        this.toastr.info('Product updated.');
        this.router.navigate(['..'], { relativeTo: this.route });
      }
    });
  }

  hasQuantityError():boolean{
    return this.createForm.value.productQuantity! < this.createForm.value.productUnitInStock!;
  }

  cancel() {
    this.router.navigate(['/homepage/products']);
  }

}
