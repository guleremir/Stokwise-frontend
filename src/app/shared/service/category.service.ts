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


  getAllCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>('/category/getAll');
  }

  addCategory(category: Category): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/category/addCategory', category);
  }
}
