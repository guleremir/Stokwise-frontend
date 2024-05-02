import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../shared/dto/product';
import { Category } from '../../../shared/dto/category';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrl: './admin-edit-product.component.scss'
})
export class AdminEditProductComponent implements OnInit{

  areYouSureQuestion = 'Are you sure you want to edit this product?'

  createForm = this.fb.nonNullable.group({
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    incomingProductQuantity: 0,
    productUnitInStock: 0,
    productMinimumCount: 0,
    productDescription: "",
  })
  productCategory = "";
  productID = "";

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
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
        incomingProductQuantity: 0
      });
    } else { }
  }

  submit() {
    console.log(this.productService.editingProduct);
    let productName = this.createForm.get('productName')!.value;
    let productPrice = (this.createForm.get('productPrice')!.value);
    let productUnitInStock = (this.createForm.get('productUnitInStock')!.value);
    let productQuantity = (this.createForm.get('productQuantity')!.value + this.createForm.get('incomingProductQuantity')!.value);
    let productMinimumCount = (this.createForm.get('productMinimumCount')!.value);
    let productDescription = (this.createForm.get('productDescription')!.value);
    this.productService.editProduct(new Product(this.productID, productName, new Category("",this.productCategory) ,productPrice, productQuantity, productUnitInStock, productMinimumCount, productDescription)).subscribe({
      next: (result) => {
        this.toastr.info('Product updated!');
        this.router.navigate(['..'], { relativeTo: this.route });
      }, error: (err) => {
        this.toastr.error('Please check the information you have entered!');
      }
    });
  }

  hasQuantityError():boolean{
    return this.createForm.value.productQuantity! < this.createForm.value.productUnitInStock!;
  }

  cancel() {
    this.router.navigate(['/adminPanel']);
  }
  editProduct(){
    this.submit();
  }

  productNameCannotBeEmpty():boolean{
    return this.createForm.value.productName! === '' ;
  }

  productPriceCannotBeEmpty():boolean{
    return this.createForm.value.productPrice! === 0 ;
  }

  productQuantityCannotBeEmpty():boolean{
    return this.createForm.value.productQuantity! === 0 ;
  }

  productMinimumCountCannotBeEmpty():boolean{
    return this.createForm.value.productMinimumCount! === 0 ;
  }

  productDescriptionCannotBeEmpty():boolean{
    return this.createForm.value.productDescription! === '' ;
  }

  bothFieldsCannotBeEmpty(): boolean {
    // İki alanın da dolu olup olmadığını kontrol etmek için productNameCannotBeEmpty ve productDescriptionCannotBeEmpty fonksiyonlarını birleştirin
    return this.productNameCannotBeEmpty() || this.productPriceCannotBeEmpty() || this.productQuantityCannotBeEmpty() || this.productMinimumCountCannotBeEmpty() || this.productDescriptionCannotBeEmpty() || this.hasQuantityError(); 
    // Eğer herhangi biri true döndürürse, en az bir alan boş demektir
  }
}
