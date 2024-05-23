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
  searchText: string = '';
  uuidToSequenceMap: { [key: string]: number} = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  loadProducts(): void {
    this.productService.getAllProduct().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.uuidToSequenceMap = {};
        this.products.forEach((product, index) => {
          this.uuidToSequenceMap[product.id] = index + 1;
        });
      },
      (error) => {
        console.error('Error loading products: ', error);
        this.toastr.error('Error loading products. Please try again !');
      }
    );
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  sortBy: string = 'productId';
  sortDirection: 'asc' | 'desc' = 'asc';

  sort(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
  }
  addProduct(){
    this.router.navigate(['addProduct'], { relativeTo: this.route });
  }
  editProduct(product: Product) {
    this.productService.editingProduct = product;
    this.router.navigate(['editProduct'], { relativeTo: this.route });
  }
  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.toastr.success("Product Successfully Deleted !");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Product quantity is not zero!");
      }
    });
  }
  reportMinimumCount(){
    this.productService.reportWarningCountProduct();
  }
  reportProduct(){
    this.productService.reportProduct();
  }
  filterProducts() {
    let filteredProducts = this.products;
    if (this.searchText) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    return filteredProducts;
  }
}