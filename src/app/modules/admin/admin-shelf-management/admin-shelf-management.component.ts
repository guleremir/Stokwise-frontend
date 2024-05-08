import { ShelfService } from './../../../shared/service/shelf.service';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminShelf } from '../../../shared/dto/admin-shelf';
import { AdminProduct } from '../../../shared/dto/admin-product';
import { FormBuilder } from '@angular/forms';
import { LoggerService } from '../../../shared/service/logger.service';

@Component({
  selector: 'app-admin-shelf-management',
  templateUrl: './admin-shelf-management.component.html',
  styleUrl: './admin-shelf-management.component.scss'
})
export class AdminShelfManagementComponent implements OnInit {

  searchForm = this.fb.nonNullable.group({
    searchText: [''] // Arama metni için değişken eklendi
  });

  selectedShelf: AdminShelf | null = null;
  deleteSelectedShelf: AdminShelf | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shelfService: ShelfService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private logger: LoggerService
  ) { }

  areYouSureQuestion = 'Are you sure you want to delete this shelf ?'
  shelves: AdminShelf[] = [];
  products: AdminProduct[] = [];
  searchShelfId: string = ''; // Arama metni için değişken eklendi

  ngOnInit(): void {
    this.loadShelves();
    this.searchForm.get("searchText")?.valueChanges.subscribe({
      next: (data) => {
        this.filterShelf(data);
      }
    })
  }

  loadShelves(){
    this.shelfService.getAllTableShelves().subscribe({
      next: (shelf => {
        this.shelves = shelf;
        this.filterShelf();
      })
    });
  }

  addShelf() {
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

  setSelectedShelf(shelf: AdminShelf) {
    if (shelf == this.selectedShelf) {
      this.selectedShelf = null;
    } else if (shelf.productCount > 0) {
      this.selectedShelf = shelf;
      this.getSelectedShelfProducts();
    }
  }

  getSelectedShelfProducts() {
    if (this.selectedShelf != null) {
      this.shelfService.getAllProductsFromShelf(this.selectedShelf.id).subscribe((products) => {
        this.products = products;
      });
    }
  }

  deleteSelectShelf(dShelf: AdminShelf) {
    if (!dShelf) {
      console.error("Invalid shelf provided.");
      return;
    }
    this.deleteSelectedShelf = dShelf;
}

  deleteShelf() {   
    if (this.deleteSelectedShelf) {
      this.shelfService.deleteShelf(this.deleteSelectedShelf!.id).subscribe({
        next: () => {         
          this.shelves = this.shelves.filter(s => s.id !== this.deleteSelectedShelf!.id);
          this.filteredShelves = this.filteredShelves.filter(s => s.id !== this.deleteSelectedShelf!.id); // Filtrelenmiş diziden de kaldır
          this.toastr.success("Shelf Successfully Deleted !");
          
          if(this.selectedShelf && this.selectedShelf.id === this.deleteSelectedShelf!.id){
            this.selectedShelf = null;
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("An error occurred while deleting the shelf !");
        }
      });
    }
  }
  
  editShelf(shelf: AdminShelf) {
    this.shelfService.editingShelf = shelf;
    this.router.navigate(['editShelf'], { relativeTo: this.route });
  }

  filteredShelves: AdminShelf[] = [];
  filterShelf(data = "") {
    this.filteredShelves = this.shelves;
    // Arama filtresi
    if (data) {
      this.filteredShelves = this.filteredShelves.filter(shelf => {
        this.logger.log(shelf)
        return shelf.productCategory?.toLowerCase().includes(data.toLowerCase())
      }
      );
    }
  }
}
