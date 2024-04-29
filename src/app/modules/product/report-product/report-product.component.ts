import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../shared/dto/product';

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrl: './report-product.component.scss'
})
export class ReportProductComponent {


  products: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }




  reportMinimumCount(){
    this.productService.reportWarningCountProduct().subscribe({
      next: () => {
        this.toastr.success("Product reported successfully");
      },
      error: (err) => {
        console.log("Error:", err); // Hatayı konsola yazdır
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

  cancel() {
    this.router.navigate(['/homepage/products']);
  }


}
