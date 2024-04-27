import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../shared/service/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../shared/dto/category';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrl: './admin-add-category.component.scss'
})
export class AdminAddCategoryComponent {

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
    this.router.navigate(['adminPanel/categories']);
  }

}
