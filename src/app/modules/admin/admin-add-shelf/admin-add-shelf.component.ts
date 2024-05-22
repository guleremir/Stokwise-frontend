import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Shelf } from '../../../shared/dto/shelf';

@Component({
  selector: 'app-admin-add-shelf',
  templateUrl: './admin-add-shelf.component.html',
  styleUrl: './admin-add-shelf.component.scss'
})
export class AdminAddShelfComponent {

  areYouSureQuestion = 'Are you sure you want to do this ?'
  createForm = this.fb.nonNullable.group({
    capacity: 0,
  });
  shelfID = "";
  productCount = 0;
  productCategory = "";
  productName = "";

  constructor(
    private fb: FormBuilder,
    private shelfService: ShelfService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  submit() { 
    const capacity = this.createForm.get('capacity')!.value;
    this.shelfService.addShelf(new Shelf(this.shelfID, this.productCount, capacity, this.productCategory,this.productName)).subscribe({
      next: (result) => {
        this.toastr.info('Shelf Successfully Changed !');
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  cancel() {
    this.router.navigate(['/adminPanel/shelves']);
  }

  addShelf(){
    this.submit();
  }

  capacityCannotBeEmpty():boolean{
    return this.createForm.value.capacity! === 0 ;
  }

  clearFieldOnFocus(fieldName: string) {
    const currentValue = this.createForm.get(fieldName)!.value;
    if (currentValue === 0) {
      this.createForm.get(fieldName)!.setValue('');
    }
  }
}



