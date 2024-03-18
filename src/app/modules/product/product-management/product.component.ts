import { Component } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    // private yazilimIlanService: YazilimIlanService,
    // private loginService: LoginService,
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

}
