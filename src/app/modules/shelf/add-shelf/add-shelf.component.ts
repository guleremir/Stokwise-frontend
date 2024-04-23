import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Shelf } from '../../../shared/dto/shelf';

@Component({
  selector: 'app-add-shelf',
  templateUrl: './add-shelf.component.html',
  styleUrl: './add-shelf.component.scss'
})
export class AddShelfComponent {
  //createShelf
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

  // close() {
  //Geri dönüş butonu oluşturulacak
  // }
  submit() {
    //let capacity = this.createForm.get('capacity');   
    const capacity = this.createForm.get('capacity')!.value;
    this.shelfService.addShelf(new Shelf(this.shelfID, this.productCount, capacity, this.productCategory,this.productName)).subscribe({
      next: (result) => {
        this.toastr.info('Shelf created.');
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  cancel() {
    this.router.navigate(['/homepage/shelves']);
  }

}
