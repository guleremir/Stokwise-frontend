import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShelfService } from '../../../shared/service/shelf.service';
import { AdminShelf } from '../../../shared/dto/admin-shelf';
import { AdminProduct } from '../../../shared/dto/admin-product';

@Component({
  selector: 'app-shelf-management',
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})

export class ShelfManagementComponent implements OnInit {

  selectedShelf: AdminShelf | null = null;

  areYouSureQuestion = 'Are you sure you want to edit this shelf ?'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shelfService: ShelfService,
    private toastr: ToastrService
  ) {}

  shelves: AdminShelf[] = [];
  products: AdminProduct[] = [];

  ngOnInit(): void {
    this.shelfService.getAllTableShelves().subscribe({
      next: (shelf => {
        this.shelves = shelf;
      })
    });
  }
  
  addShelf(){
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

  setSelectedShelf(shelf: AdminShelf) {
    if(shelf === this.selectedShelf){
      // Seçili raf zaten varsa ve tekrar tıklanırsa, seçili rafı kapat
      this.selectedShelf = null;
    } else {
      // Seçili rafı değiştir
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

  editShelf(shelf : AdminShelf) {
    this.shelfService.editingShelf = shelf;
    this.router.navigate(['editShelf'], { relativeTo: this.route });
  }
  
  deleteShelf(shelf: AdminShelf | null) {
    if(shelf){
      this.shelfService.deleteShelf(shelf.id).subscribe({
      next: () => {
        this.shelves = this.shelves.filter(s => s.id!== shelf.id);
        this.toastr.success("Shelf Successfully Deleted !");
      },
      error: (err)=> {
        console.log(err);
      }
      })
    }
  }
}
