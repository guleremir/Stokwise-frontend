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

  itemsPerPage= 8;
  allProducts: Product[] = [];
  productsPerPage: Product[] = [];
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
    
  }
  getAllProduct(){ 
    this.productService.getAllProduct().subscribe({
      next: (products => {
        this.allProducts = products;
        this.totalPages= Math.ceil(products.length/this.itemsPerPage)
        this.updatePageProducts();
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
        this.allProducts = this.allProducts.filter(p => p.id !== id);
        this.toastr.success("Product Successfully Deleted !");
        this.getAllProduct();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Product quantity is not zero!");
      }
    });
  }
  selectedProduct(productId: string){
    this.id = productId;
  }

  // filterProduct(data="") {
  //   this.filteredProducts= this.allProducts ;
  //   // Arama filtresi
  //   if (data) {
  //    this.filteredProducts = this.filteredProducts.filter(product => {
  //     this.logger.log(product)
  //     return product.name?.toLowerCase().includes(data.toLowerCase())
  //    }
  //    );
  //   }
  // }
  
  reportMinimumCount(){
    this.productService.reportWarningCountProduct();
  }
  reportProduct(){
    this.productService.reportProduct();
  }
  
  filterProduct(data="") {
    // Filtreleme bütün ürünler üzerinde yapılır
    if (data) {
      this.filteredProducts = this.allProducts.filter(product => {
        return product.name?.toLowerCase().includes(data.toLowerCase());
      });
    } else {
      this.filteredProducts = this.allProducts;
    }
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1; // Filtreleme sonrası sayfayı sıfırla
    this.updatePageProducts();
  }

  totalPages = 0;
  currentPage = 1;
  onPageChange(pageNo: number) {
    if (pageNo < 1 || pageNo > this.totalPages) {
      return; // Geçersiz sayfa numarası, işlemi durdur
    }
    this.currentPage = pageNo;
    this.updatePageProducts();
  }

  
  updatePageProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.productsPerPage = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    const numPagesToShow = 5; // Gösterilecek maksimum sayfa sayısı
  const currentPage = this.currentPage;
  const totalPages = this.totalPages;
  
  let startPage: number;
  let endPage: number;

  if (totalPages <= numPagesToShow) {
    // Toplam sayfa sayısı, gösterilecek maksimum sayfa sayısından az veya eşitse
    startPage = 1;
    endPage = totalPages;
  } else {
    // Toplam sayfa sayısı, gösterilecek maksimum sayfa sayısından fazlaysa
    if (currentPage <= Math.floor(numPagesToShow / 2)) {
      // Mevcut sayfa ilk sayfalardaysa
      startPage = 1;
      endPage = numPagesToShow;
    } else if (currentPage + Math.floor(numPagesToShow / 2) >= totalPages) {
      // Mevcut sayfa son sayfalardaysa
      startPage = totalPages - numPagesToShow + 1;
      endPage = totalPages;
    } else {
      // Mevcut sayfa orta kısımdaysa
      startPage = currentPage - Math.floor(numPagesToShow / 2);
      endPage = currentPage + Math.floor(numPagesToShow / 2);
    }
  }
  return Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
}




