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
    searchText: ['']
  });

  itemsPerPage= 8;
  selectedShelf: AdminShelf | null = null;
  selvesPerPage: AdminShelf[] = [];
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
        this.totalPages= Math.ceil(this.shelves.length/this.itemsPerPage)
        this.updatePageShelves();
        this.filterShelf();
      })
    });
  }

  filteredShelves: AdminShelf[] = [];
  filterShelf(data = "") {
    this.filteredShelves = this.shelves;
    if (data) {
      this.filteredShelves = this.filteredShelves.filter(shelf => {
                return shelf.productCategory?.toLowerCase().includes(data.toLowerCase())
      }
      );
    } else {
      this.filteredShelves = this.shelves;
    }
    this.totalPages = Math.ceil(this.filteredShelves.length / this.itemsPerPage);
    this.currentPage = 1; 
    this.updatePageShelves();
  }
  
  addShelf(){
    this.router.navigate(['addShelf'], { relativeTo: this.route });
  }

  setSelectedShelf(shelf: AdminShelf) {
    if(shelf === this.selectedShelf){
      this.selectedShelf = null;
    } else {
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
        this.filteredShelves = this.filteredShelves.filter(s => s.id !== shelf.id);
        this.toastr.success("Shelf Successfully Deleted !");
      },
      error: (err)=> {
        console.log(err);
      }
      })
    }
  }
  updatePageShelves(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.selvesPerPage = this.filteredShelves.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  totalPages = 0;
  currentPage = 1;
  onPageChange(pageNo: number) {
    if (pageNo < 1 || pageNo > this.totalPages) {
      return; 
    }
    this.currentPage = pageNo;
    this.updatePageShelves();
  }

  totalPagesArray(): number[] {
    const numPagesToShow = 5; 
    const currentPage = this.currentPage;
    const totalPages = this.totalPages;
  
    let startPage: number;
    let endPage: number;

    if (totalPages <= numPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.floor(numPagesToShow / 2)) {
        startPage = 1;
        endPage = numPagesToShow;
      } else if (currentPage + Math.floor(numPagesToShow / 2) >= totalPages) {
        startPage = totalPages - numPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(numPagesToShow / 2);
        endPage = currentPage + Math.floor(numPagesToShow / 2);
      }
    }
  return Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
}
