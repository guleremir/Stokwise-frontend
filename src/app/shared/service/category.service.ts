import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../dto/category';
import { SuccessResponse } from '../dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  editingCategory: Category | null = null;


  getAllCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>('/category/getAll');
  }

  addCategory(category: Category): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/category/addCategory', category);
  }

editCategory(id:string, name: string):
Observable<SuccessResponse> {
  return this.httpClient.post<SuccessResponse>('/category/editCategory', {id,name});
}

deleteCategory(id:string):
Observable<SuccessResponse> {
  return this.httpClient.post<SuccessResponse>('/category/deleteCategory', { id });

}


}
  