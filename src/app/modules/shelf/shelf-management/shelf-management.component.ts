import { Component, OnInit } from '@angular/core';
import { Shelf } from '../../../shared/dto/shelf';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { ShelfService } from '../../../shared/service/shelf.service';
import { HttpClient } from '@angular/common/http';
import { AdminShelf } from '../../../shared/dto/admin-shelf';
import { AdminProduct } from '../../../shared/dto/admin-product';

@Component({
  selector: 'app-shelf-management',
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})
//ngOnInit() ?
export class ShelfManagementComponent implements OnInit {

  //shelves : Shelf[] = [];
  selectedShelf: AdminShelf | null = null;
  // selectTableShelf: Shelf | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     private shelfService: ShelfService,
     private toastr: ToastrService,
     private http: HttpClient
  ) { }

  shelves: AdminShelf[] = [];
  products: AdminProduct[] = [];

  // ngOnInit(): void {
  //   this.http.get<any[]>('/getAllShelves').subscribe(
  //     data => {
  //       console.log(data);
  //       this.shelves = data;
  //     },
  //     error => {
  //       console.error('Error fetching shelves:', error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.shelfService.getAllTableShelves().subscribe({
      next: (shelf => {
        console.log(shelf);
        this.shelves = shelf;
      })
    });
  }

  //Component çağrıldığında çalışan method.
  // ngOnInit(): void {
  //   this.shelfService.getAllShelves().subscribe({
  //     next: (data => {
  //       this.shelves = data;
  //   console.log(this.shelves);
  //     })
  //   });
  // }
  
  addShelf(){
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

  setSelectedShelf(shelf: AdminShelf) {
    // console.log(this.selectedShelf);
    // if (shelf == this.selectedShelf) {
    //   this.selectedShelf = null;
    // } else if(shelf.productCount > 0){
    //   this.selectedShelf = shelf;
    //   this.getSelectedShelfProducts();
    // } 

    if(shelf === this.selectedShelf){
      // Seçili raf zaten varsa ve tekrar tıklanırsa, seçili rafı kapat
      this.selectedShelf = null;
    } else {
      // Seçili rafı değiştir
      this.selectedShelf = shelf;
      console.log(this.selectedShelf);
      this.getSelectedShelfProducts();
    }
  }
  getSelectedShelfProducts() {
    if(this.selectedShelf != null){
      this.shelfService.getAllProductsFromShelf(this.selectedShelf.id).subscribe((products)=>{
        this.products=products;
      });
    }
  }

  // selectShelf(shelf: Shelf) {
  //   if (shelf == this.selectTableShelf) {
  //     this.selectTableShelf = null;
  //   } else {
  //     this.selectTableShelf = shelf;
  //   }
  // }

  editShelf(shelf : AdminShelf) {
    this.shelfService.editingShelf = shelf;
    console.log(shelf);
    this.router.navigate(['editShelf'], { relativeTo: this.route });
  }
  
  deleteShelf(shelf: AdminShelf) {
    console.log(shelf.id);
    this.shelfService.deleteShelf(shelf.id).subscribe({
      next: () => {
        this.shelves = this.shelves.filter(s => s.id!== shelf.id);
        this.toastr.success("Shelf deleted successfully");
        console.log(this.shelves);
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

}
