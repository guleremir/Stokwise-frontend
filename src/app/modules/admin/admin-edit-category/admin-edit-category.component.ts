import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../shared/service/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-category',
  templateUrl: './admin-edit-category.component.html',
  styleUrl: './admin-edit-category.component.scss'
})
export class AdminEditCategoryComponent {

  areYouSureQuestion = 'Are you sure you want to edit this category?'

  createForm = this.fb.nonNullable.group({
    name:"",
  })
  categoryID: string = "";
 
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.categoryService.editingCategory != null) {
     this.categoryID = this.categoryService.editingCategory.id;
     this.createForm.setValue({
       name : this.categoryService.editingCategory.name,
     });
    } 
  }

  submit() {
    const name = this.createForm.get('name')!.value;
    this.categoryService.editCategory(this.categoryID,name).subscribe({
      next:() => {
        this.toastr.info('Category Successfully Saved !');
        this.router.navigate(['/adminPanel/categories']);
      },
      error:(error) => {
        this.toastr.error('Category Editing Failed !');
        console.log(error);
      }
    })
  }

  cancel() {
    this.router.navigate(['/adminPanel/categories']);
  }

  editCategory(){
    this.submit();
  }

  categoryNameCannotBeEmpty():boolean{
    return this.createForm.value.name! === '' ;
  }
}
