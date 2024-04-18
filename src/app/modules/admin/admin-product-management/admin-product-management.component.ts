import { Component } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product-management',
  templateUrl: './admin-product-management.component.html',
  styleUrl: './admin-product-management.component.scss'
})
export class AdminProductManagementComponent {
  products: Product[] = [];
  searchText: string = ''; // Arama metni için değişken eklendi

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe({
      next: (products => {
        console.log(products);
        this.products = products;
      })
    });
  }

  addProduct(){
    this.router.navigate(['addProduct'], { relativeTo: this.route });
  }

  editProduct(product: Product) {
    // this.productService.editProduct = product;
    this.productService.editingProduct = product;
    console.log(product);
    this.router.navigate(['editProduct'], { relativeTo: this.route });
  }

  deleteProduct(product: Product) {
    //console.log(product);
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.toastr.success("Product deleted successfully");
        //console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  reportProduct(){
    this.productService.reportProduct().subscribe({
      next: () => {
        this.toastr.success("Product reported successfully");
      },
      error: (err) => {
        console.log("Error:", err); // Hatayı konsola yazdır
      }
    });
  }

  // Ürünleri filtrelemek için fonksiyon eklendi
  filterProducts(): Product[] {
    return this.products.filter(product => {
      return product.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
}