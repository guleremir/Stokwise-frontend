import { Component, OnInit} from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { CategoryService } from '../../../shared/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../shared/dto/product';
import { Category } from '../../../shared/dto/category';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.scss'
})
export class AdminAddProductComponent implements OnInit{
  categories: Category[] = [];

  areYouSureQuestion = 'Are you sure you want to add this product ?'

  //createProduct
  createForm = this.fb.nonNullable.group({
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productUnitInStock: 0,
    productMinimumCount:0,
    productDescription: "",
    productCategoryID: "",
  })
  productID = "";

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  submit() {
    let productName = this.createForm.get('productName')!.value;
    let productPrice = (this.createForm.get('productPrice')!.value);
    let productUnitInStock = (this.createForm.get('productUnitInStock')!.value);
    let productQuantity = (this.createForm.get('productQuantity')!.value);
    let productMinimumCount = (this.createForm.get('productMinimumCount')!.value);
    let productDescription = (this.createForm.get('productDescription')!.value);
    let productCategoryID = (this.createForm.get('productCategoryID')!.value);
    this.productService.addProduct(new Product(this.productID, productName, new Category(productCategoryID,"") ,productPrice,productQuantity,productUnitInStock,productMinimumCount, productDescription )).subscribe({
      next: (result) => {
        this.toastr.info('Product Successfully Created !');
        this.router.navigate(['..'], { relativeTo: this.route });
      }
    });
  }

  cancel() {
    this.router.navigate(['/adminPanel']);
  }

  addProduct(){
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
    return this.productNameCannotBeEmpty() || this.productPriceCannotBeEmpty() || this.productQuantityCannotBeEmpty() || this.productMinimumCountCannotBeEmpty() || this.productDescriptionCannotBeEmpty(); 
  }
  clearFieldOnFocus(fieldName: string) {
    const currentValue = this.createForm.get(fieldName)!.value;
    if (currentValue === 0) {
      this.createForm.get(fieldName)!.setValue('');
    }
  }
}
