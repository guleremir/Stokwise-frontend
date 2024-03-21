import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../../shared/dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   editingProduct : Product | null = null;

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllProduct(){
    return this.httpClient.get<Product[]>('/getAllProducts');
  }

  addProduct(product: Product): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/addProduct', product);
  }

  deleteProduct(id : number): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/deleteProduct', {id});
  }
  editProduct(product: Product): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/updateProduct', product);
  }


}
