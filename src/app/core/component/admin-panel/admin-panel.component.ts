import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { Product } from '../../../shared/dto/product';
import { ProductService } from '../../../shared/service/product.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  url = "";
  products: Product[] = []; 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.url = event.url;
        }
      }
    });
    this.productService.getAllProduct().subscribe({
      next: (products => {
        console.log(products);
        this.products = products;
      })
    });
  }
//   calculateProgress(): number {
//     if (this.products.length > 0) {
//         // Tüm ürünlerin sayısını 200'e göre oranlayarak ilerleme yüzdesini hesaplar
//         return (this.products.length / 60) * 100;
//     } else {
//         // Eğer ürün yoksa ilerleme çubuğu boş olmalı
//         return 0;
//     }
// }
calculateProgress(): number {
  return (this.products.length / 70) * 100; // 500000, maksimum sayfa görünümü
}
  logout() {
    this.loginService.logout();
    this.toastr.success("Logout Successfuly!");
    this.router.navigate(['/login']);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  getTotalProductQuantity(): number {
    return this.products.reduce((total, product) => total + product.quantity, 0);
  }

}
