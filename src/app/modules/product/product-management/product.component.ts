import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { LoggerService } from '../../../shared/service/logger.service';
import { Category } from '../../../shared/dto/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  p= 1;
  itemsPerPage= 8;
  totalProduct:any;
  products: Product[] = [];
  searchForm = this.fb.nonNullable.group({
    searchText: [''] 
  });
  @Input() product: Product = new Product("", '',new Category() , 0, 0, 0, 0,'');
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  
  id = "";
  selectedProductId: string =  "";
  filteredProducts: Product [] = [];
  areYouSureQuestion = 'Are you sure you want to delete this product ?'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private logger: LoggerService,
    private fb: FormBuilder,
  ) {}
  //Component çağrıldığında çalışan method.
  ngOnInit(): void {
    this.getAllProduct();
    this.searchForm.get("searchText")?.valueChanges.subscribe({
      next: (data) =>{
        this.filterProduct(data);
      }
    });
    this.totalProduct = this.products.length;
  }
  getAllProduct(){ 
    this.productService.getAllProduct().subscribe({
      next: (products => {
        this.products = products;
        this.filterProduct();
      })
    });
  }
  addProduct() {
    this.router.navigate(['addProduct'], { relativeTo: this.route });
  }
  editProduct(product: Product) {
    this.productService.editingProduct = product;
    console.log(product);
    this.router.navigate(['editProduct'], { relativeTo: this.route });
  }
  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        this.toastr.success("Product Successfully Deleted !");
        this.getAllProduct();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  selectedProduct(productId: string){
    this.id = productId;
  }
  filterProduct(data="") {
    this.filteredProducts= this.products ;
    // Arama filtresi
    if (data) {
     this.filteredProducts = this.filteredProducts.filter(product => {
      this.logger.log(product)
      return product.name?.toLowerCase().includes(data.toLowerCase())
     }
     );
    }
  }
  reportMinimumCount(){
    this.productService.reportWarningCountProduct();
  }
  reportProduct(){
    this.productService.reportProduct();
  }
}


