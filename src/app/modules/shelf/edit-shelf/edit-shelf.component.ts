import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Shelf } from '../../../shared/dto/shelf';

@Component({
  selector: 'app-edit-shelf',
  templateUrl: './edit-shelf.component.html',
  styleUrl: './edit-shelf.component.scss'
}) 
export class EditShelfComponent implements OnInit {

  areYouSureQuestion = 'Are you sure you want to edit this shelf?'

  createForm = this.fb.nonNullable.group({
    capacity: 0,
  });
  shelfID = "";
  productCount = 0;
  productCategory = "";
  productName = "";

  ngOnInit(): void {
     console.log(this.shelfService.editingShelf);
     if (this.shelfService.editingShelf != null) {
      this.shelfID = this.shelfService.editingShelf.id;
      this.createForm.setValue({
        capacity : this.shelfService.editingShelf.capacity,
      });
      // console.log(this.productService.editingProduct);
    } else { }
  }

  constructor(
    private fb: FormBuilder,
    private shelfService: ShelfService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  // close() {
  //Geri dönüş butonu oluşturulacak
  // }
  submit() {
    //let capacity = this.createForm.get('capacity');   
    const capacity = this.createForm.get('capacity')!.value;
    this.shelfService.editShelf(this.shelfID, capacity).subscribe({
      next: (result) => {
        this.toastr.info('Shelf edited.');
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (error) => {
        this.toastr.error('You cannot set capacity less than the number of products in the shelf.');
        console.log(error);
      }
    });
  }
  cancel() {
    this.router.navigate(['/homepage/shelves']);
  }
  editShelf(){
    this.submit();
  }

  deleteShelf(){
    this.submit();
  }
  
}
