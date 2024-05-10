import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/dto/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/service/category.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category-management',
  templateUrl: './admin-category-management.component.html',
  styleUrl: './admin-category-management.component.scss'
})
export class AdminCategoryManagementComponent implements OnInit {

  areYouSureQuestion = 'Are you sure you want to edit this category ?'
  deleteQuestion = 'Are you sure you want to delete this category ?'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { }

  selectedCategory: Category | null = null;
  categories: Category[] = [];
 
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (category => {
        this.categories = category;
      })
    });
  }

  addCategory() {
    this.router.navigate(['addCategory'], {
      relativeTo: this.route
    });
  }

  editCategory(category:Category){
    this.categoryService.editingCategory = category;
    this.router.navigate(['editCategory'],{
      relativeTo:this.route
    });
  } 

  deleteCategory() {
    if (this.selectedCategory) {
        this.categoryService.deleteCategory(this.selectedCategory.id).subscribe({
          next: () => {
            this.categories = this.categories.filter(c => c.id!== this.selectedCategory!.id);
            this.toastr.success("Category Successfully Deleted!");
          },
          error: (err)=> {
            console.log(err);
            this.toastr.error("Error while deleting the category because there is a product in the category!");
          }
        }) 
    }
  }
}
