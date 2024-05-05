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
        // UUID'leri sıralı numaralarla eşleştirme
        this.uuidToSequenceMap = {}; // Önce objeyi sıfırlayın
        this.products.forEach((product, index) => {
          // Her ürünün id'sini sıralı numaralarla eşleştir
          this.uuidToSequenceMap[product.id] = index + 1;
        });
        console.log('Products: ', this.products);
      // console.log('uuidToSequenceMap: ', this.uuidToSequenceMap);
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
  // Sıralama sütunu ve sıralama tipi
  sortBy: string = 'productId'; // Varsayılan olarak productName'e göre sırala
  sortDirection: 'asc' | 'desc' = 'asc'; // Varsayılan olarak artan sıralama

  // Sıralama fonksiyonu
  sort(column: string) {
    if (this.sortBy === column) {
      // Sıralama sütunu aynıysa sıralama tipini değiştir
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Sıralama sütunu değiştiyse varsayılan olarak artan sıralamaya dön
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
      }
    });
  }
  reportMinimumCount(){
    this.productService.reportWarningCountProduct();
  }
  reportProduct(){
    this.productService.reportProduct();
  }
  // Ürünleri filtrelemek için fonksiyon eklendi
  filterProducts() {
    let filteredProducts = this.products;
    // Arama filtresi
    if (this.searchText) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    return filteredProducts;
  }
}