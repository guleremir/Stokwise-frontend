import { Injectable } from '@angular/core';
import { Shelf } from '../dto/shelf';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../dto/successResponse';
import { AdminProduct } from '../dto/admin-product';
import { AdminShelf } from '../dto/admin-shelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  
  editingShelf: AdminShelf | null = null;
  
  constructor(
    private httpClient: HttpClient
  ) { }
  
  getAllShelves():Observable<Shelf[]> {
    return this.httpClient.get<Shelf[]>('/getAllShelves');
  }
  
  addShelf(shelf: Shelf): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/addShelf', shelf);
  }
  
  deleteShelf(id: number): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/deleteShelf', { id });
  }
  
  editShelf(id: number, capacity: number): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/editShelf', { id, capacity });
  }
  
  getAllProductsFromShelf(id: number): Observable<AdminProduct[]> {
    return this.httpClient.post<AdminProduct[]>('/getAllProductsFromShelf', { id });
  }

  getAllTableShelves():Observable<AdminShelf[]> {
    return this.httpClient.get<AdminShelf[]>('/getAllTableShelves');
  }
  
}
