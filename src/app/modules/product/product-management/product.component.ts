import { Component } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Product[] = [];

  selectedProductId: string =  "";
  areYouSureQuestion = 'Are you sure you want to delete this product?'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  //Component çağrıldığında çalışan method.
  ngOnInit(): void {
    //ProductService'den getAllProducts() methodunu çağrıyor. Tüm productları döndürüyor.
    this.productService.getAllProduct().subscribe({
      next: (products => {
        console.log(products);
        this.products = products;
        
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
 

}
