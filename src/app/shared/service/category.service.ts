import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../dto/category';

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
}
