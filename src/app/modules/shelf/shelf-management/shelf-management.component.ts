import { Component } from '@angular/core';
import { Shelf } from '../../../shared/dto/shelf';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { ShelfService } from '../service/shelf.service';

@Component({
  selector: 'app-shelf-management',
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})
export class ShelfManagementComponent {

  shelves : Shelf[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     private shelfService: ShelfService,
    private toastr: ToastrService
  ) { }


  //Component çağrıldığında çalışan method.
  ngOnInit(): void {
    // this.productService.getAllProduct().subscribe({
    //   next: (products => {
    //     console.log(products);
    //     // this.products = products;
    //   })
    // });
  }

  addShelf(){
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

}
