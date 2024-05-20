import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-shelf',
  templateUrl: './admin-edit-shelf.component.html',
  styleUrl: './admin-edit-shelf.component.scss'
})
export class AdminEditShelfComponent{

  areYouSureQuestion = 'Are you sure you want to edit this shelf ?'

  createForm = this.fb.nonNullable.group({
    capacity: 0,
  });
  shelfID: string = "";
  productCount = 0;
  productCategory = "";
  productName = "";

  ngOnInit(): void {
     if (this.shelfService.editingShelf != null) {
      this.shelfID = this.shelfService.editingShelf.id;
      this.createForm.setValue({
        capacity : this.shelfService.editingShelf.capacity,
      });
    } 
  }

  constructor(
    private fb: FormBuilder,
    private shelfService: ShelfService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  submit() { 
    const capacity = this.createForm.get('capacity')!.value;
    this.shelfService.editShelf(this.shelfID, capacity).subscribe({
      next: () => {
        this.toastr.info('Shelf Successfully Saved !');
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (error) => {
        this.toastr.error('You cannot set capacity less than the number of products in the shelf !');
        console.log(error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/adminPanel/shelves']);
  }

  editShelf(){
    this.submit();
  }

  capacityCannotBeEmpty():boolean{
    return this.createForm.value.capacity! === 0 ;
  }
}