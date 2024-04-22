import { Component, OnInit } from '@angular/core';
import { Shelf } from '../../../shared/dto/shelf';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AdminShelf } from '../../../shared/dto/admin-shelf';
import { AdminProduct } from '../../../shared/dto/admin-product';

@Component({
  selector: 'app-admin-shelf-management',
  templateUrl: './admin-shelf-management.component.html',
  styleUrl: './admin-shelf-management.component.scss'
})
export class AdminShelfManagementComponent implements OnInit {
  selectedShelf: AdminShelf | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     private shelfService: ShelfService,
     private toastr: ToastrService
  ) { }

  shelves: AdminShelf[] = [];
  products: AdminProduct[] = [];
  searchShelfId: string = ''; // Arama metni için değişken eklendi

  

  ngOnInit(): void {
    this.shelfService.getAllTableShelves().subscribe({
      next: (shelf => {
        console.log(shelf);
        this.shelves = shelf;
      })
    });
  }
  addShelf(){
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

  setSelectedShelf(shelf: AdminShelf) {
    if (shelf == this.selectedShelf) {
      this.selectedShelf = null;
    } else if(shelf.productCount > 0){
      this.selectedShelf = shelf;
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

  editShelf(shelf : Shelf) {
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

  filterShelf(): AdminShelf[] {
    return this.shelves.filter( shelf => {
      return shelf.id.toString().includes(this.searchShelfId);
    });
  }

  

  }
