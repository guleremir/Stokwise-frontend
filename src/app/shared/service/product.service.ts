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
  ) { }


  getAllProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>('/getAllProducts');
  }

  reportWarningCountProduct(): Observable<SuccessResponse>{
    return this.httpClient.get<SuccessResponse>('/reportProductWarningCount');
  }

  reportProduct(): Observable<SuccessResponse>{
    return this.httpClient.get<SuccessResponse>('/reportProduct');
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

  // acceptProduct(productID: number, count: number): Observable<SuccessResponse> {
  //   return this.httpClient.post<SuccessResponse>('/placeProduct', {productID, count});
  // }

  // acceptProduct(productId: number, count: number): Observable<any> {
  //   const url = '/entryProduct'; // Endpoint URL'si
  //   const requestBody = { productId, count }; // Gönderilecek veri
  //   return this.httpClient.post<any>(url, requestBody);
  // }

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

  // // Yeni fonksiyon: Ürün stok miktarını azalt
  // decreaseProductStock(productId: number, count: number): Observable<SuccessResponse> {
  //   const url = '/decreaseProductStock'; // Backend'de bu endpoint'e karşılık gelen bir URL olmalı
  //   const requestBody = { productId, count };
  //   return this.httpClient.post<SuccessResponse>(url, requestBody);
  // }
  shortenUuid(uuid: string): string {
    return uuid.substring(0, 8);
  }

}
