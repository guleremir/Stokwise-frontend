import { Category } from './../../../shared/dto/category';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  //createCategory
  createForm = this.fb.nonNullable.group({
    categoryName: "",
  });
  categoryID: "" | undefined;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  submit() { 
    let categoryName = this.createForm.get('categoryName')!.value;
    this.categoryService.addCategory(new Category(this.categoryID, categoryName)).subscribe({
      next: (result) => {
        this.toastr.info('Category created!');
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  cancel() {
    this.router.navigate(['homepage/products/addProduct']);
  }

}
