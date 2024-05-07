import { HttpClient , HttpHeaders } from '@angular/common/http';
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
  ) {}

  getAllProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>('/getAllProducts');
  }
  reportWarningCountProduct(){
    window.location.href='http://localhost:8080/api/v1/reportProductWarningCount';
  }
  reportProduct(){
    window.location.href='http://localhost:8080/api/v1/reportProduct';
  }
  addProduct(product: Product): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/addProduct', product);
  }
  deleteProduct(id : string): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/deleteProduct', {id});
  }
  editProduct(product: Product): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/updateProduct', product);
  }
  getAllProductsFromShelves(): Observable<Product[]>{
    return this.httpClient.get<Product[]>('/getAllProductsFromShelves');
  }
  acceptProduct(productId: string, count: number): Observable<string> {
    const url = '/entryProduct';
    const requestBody = { productId, count };
    return this.httpClient.post<string>(url, requestBody, { responseType: 'text' as 'json' });
  }
  dispatchProduct(productId: string, count: number): Observable<string>{
    const url = '/dispatchProduct';
    const requestBody = { productId, count };
    return this.httpClient.post<string>(url, requestBody, { responseType: 'text' as 'json' });
  }
  shortenUuid(uuid: string): string {
    return uuid.substring(0, 8);
  }
}
