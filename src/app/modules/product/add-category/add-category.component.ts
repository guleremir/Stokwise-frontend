import { Category } from './../../../shared/dto/category';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from '../../../shared/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  areYouSureQuestion = 'Are you sure you want to do this ?'

  createForm = this.fb.nonNullable.group({
    categoryName: "",
  });
  categoryID: "" | undefined;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  submit() { 
    let categoryName = this.createForm.get('categoryName')!.value;
    this.categoryService.addCategory(new Category(this.categoryID, categoryName)).subscribe({
      next: (result) => {
        this.toastr.info('Category Successfully Created !');
        this.router.navigate(['homepage/products/addProduct']);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  cancel() {
    this.router.navigate(['homepage/products/addProduct']);
  }

  addCategory(){
    this.submit();
  }

  confirmCategoryCannotBeEmpty():boolean{
    return this.createForm.value.categoryName! === '' ;
  }
}
