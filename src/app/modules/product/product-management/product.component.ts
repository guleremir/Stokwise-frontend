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
  products: Product[] = [];
  searchForm = this.fb.nonNullable.group({
    searchText: [''] // Arama metni için değişken eklendi
  });
  @Input() product: Product = new Product("", '',new Category() , 0, 0, 0, 0,'');
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  
  selectedProductId: string =  "";
  areYouSureQuestion = 'Are you sure you want to delete this product?'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private logger: LoggerService,
    private fb: FormBuilder
  ) { }

  //Component çağrıldığında çalışan method.
  ngOnInit(): void {
    this.getAllProduct();
    this.searchForm.get("searchText")?.valueChanges.subscribe({
      next: (data) =>{
        this.filterProduct(data);
      }
    });
  }

  getAllProduct(){
    //ProductService'den getAllProducts() methodunu çağrıyor. Tüm productları döndürüyor.
    this.productService.getAllProduct().subscribe({
      next: (products => {
        console.log(products);
        this.products = products;
        this.filterProduct();
      })
    });
  }

  addProduct() {
    this.router.navigate(['addProduct'], { relativeTo: this.route });
  }
  
  editProduct(product: Product) {
    // this.productService.editProduct = product;
    this.productService.editingProduct = product;
    console.log(product);
    this.router.navigate(['editProduct'], { relativeTo: this.route });
  }

  // deleteProduct(product: Product) {
  //   //console.log(product);
  //   this.productService.deleteProduct(product.id).subscribe({
  //     next: () => {
  //       this.products = this.products.filter(p => p.id !== product.id);
  //       this.toastr.success("Product deleted successfully");
  //       //console.log(this.products);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  deleteProduct(id: any) {
    //console.log(product);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        this.toastr.success("Product deleted successfully");
        this.getAllProduct();
        //console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  id = "";
  selectedProduct(productId: string){
    this.id = productId;
  }

  filteredProducts: Product [] = [];
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

}
