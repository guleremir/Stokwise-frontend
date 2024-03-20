import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../shared/dto/product';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../../shared/dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // yazilimIlanVer(ilanVer: any): Observable<any> {
  //   return this.httpClient.post<any>('/yazilimIlanVer', ilanVer);
  // }
  getAllProduct(){
    return this.httpClient.get<Product[]>('/getAllProducts');
  }

  addProduct(product: Product): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/addProduct', product);
  }

  // deleteProduct(product:Product): Observable<SuccessResponse> {
  //   return this.httpClient.post<SuccessResponse>('/deleteProduct', product);
  // }


}
