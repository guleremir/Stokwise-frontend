import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../dto/product';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   editingProduct : Product | null = null;

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllProduct(): Observable<Product[]>{
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

  acceptProduct(productID: number, count: number): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/placeProduct', {productID, count});
  }

}
