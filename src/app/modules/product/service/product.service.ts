import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../shared/dto/product';

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

}
