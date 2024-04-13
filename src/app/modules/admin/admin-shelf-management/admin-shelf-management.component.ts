import { Component, OnInit } from '@angular/core';
import { Shelf } from '../../../shared/dto/shelf';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-shelf-management',
  templateUrl: './admin-shelf-management.component.html',
  styleUrl: './admin-shelf-management.component.scss'
})
export class AdminShelfManagementComponent implements OnInit {
  selectedShelf: Shelf | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     private shelfService: ShelfService,
     private toastr: ToastrService
  ) { }

  shelves: any[] = [];
  products: any[] = [];

  

  ngOnInit(): void {
    this.shelfService.getAllShelves().subscribe({
      next: (shelf => {
        console.log(shelf);
        this.shelves = shelf;
      })
    });
  }
  addShelf(){
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

  selectShelf(shelf: Shelf) {
    if (shelf == this.selectedShelf) {
      this.selectedShelf = null;
    } else {
      this.selectedShelf = shelf;
    }
  }

  editShelf(shelf : Shelf) {
    this.shelfService.editingShelf = shelf;
    console.log(shelf);
    this.router.navigate(['editShelf'], { relativeTo: this.route });
  }
  
  deleteShelf(shelf: Shelf) {
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
