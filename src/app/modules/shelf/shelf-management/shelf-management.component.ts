import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShelfService } from '../../../shared/service/shelf.service';
import { AdminShelf } from '../../../shared/dto/admin-shelf';
import { AdminProduct } from '../../../shared/dto/admin-product';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shelf-management',
  templateUrl: './shelf-management.component.html',
  styleUrl: './shelf-management.component.scss'
})

export class ShelfManagementComponent implements OnInit {

  searchForm = this.fb.nonNullable.group({
    searchText: [''] // Arama metni için değişken eklendi
  });


  selectedShelf: AdminShelf | null = null;

  areYouSureQuestion = 'Are you sure you want to edit this shelf ?'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shelfService: ShelfService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  shelves: AdminShelf[] = [];
  products: AdminProduct[] = [];

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

  filteredShelves: AdminShelf[] = [];
  filterShelf(data = "") {
    this.filteredShelves = this.shelves;
    // Arama filtresi
    if (data) {
      this.filteredShelves = this.filteredShelves.filter(shelf => {
                return shelf.productCategory?.toLowerCase().includes(data.toLowerCase())
      }
      );
    }
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
        this.filteredShelves = this.filteredShelves.filter(s => s.id !== shelf.id); // Filtrelenmiş diziden de kaldır
        this.toastr.success("Shelf Successfully Deleted !");
      },
      error: (err)=> {
        console.log(err);
      }
      })
    }
  }
}
