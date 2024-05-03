import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/dto/category';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from '../../../shared/service/category.service';

import { FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-admin-category-management',
  templateUrl: './admin-category-management.component.html',
  styleUrl: './admin-category-management.component.scss'
})
export class AdminCategoryManagementComponent implements OnInit {

  areYouSureQuestion = 'Are you sure you want to edit this category?'
  deleteQuestion = 'Are you sure you want to delete this category?'

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
        console.log(category);
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
    console.log(category);
    this.router.navigate(['editCategory'],{
      relativeTo:this.route
    });
    
  }

  

  deleteCategory() {
       
    if (this.selectedCategory) {
        this.categoryService.deleteCategory(this.selectedCategory.id).subscribe({
          next: () => {
            this.categories = this.categories.filter(c => c.id!== this.selectedCategory!.id);
            this.toastr.success("Category deleted successfully");
            console.log(this.categories);
          },
          error: (err)=> {
            console.log(err);
          }
        })
        
    }
}


  

}
