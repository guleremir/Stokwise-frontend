import { Component } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Product[] = [];

  constructor(
    public router: ActivatedRoute,
    private productService: ProductService,
    // private yazilimIlanService: YazilimIlanService,
    // private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe({
      next: (products => {
        this.products = products;
      })
    });
  }


}
