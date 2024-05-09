import { Injectable } from '@angular/core';
import { Shelf } from '../dto/shelf';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../dto/successResponse';
import { AdminProduct } from '../dto/admin-product';
import { AdminShelf } from '../dto/admin-shelf';
import { map } from 'rxjs/operators';

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
  
  deleteShelf(id: string): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/deleteShelf', { id });
  }
  
  editShelf(id: string, capacity: number): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/editShelf', { id, capacity });
  }
  
  getAllProductsFromShelf(id: string): Observable<AdminProduct[]> {
    return this.httpClient.post<AdminProduct[]>('/getAllProductsFromShelf', { id });
  }

  /* getAllTableShelves():Observable<AdminShelf[]> {
    return this.httpClient.get<AdminShelf[]>('/getAllTableShelves');
  } */
  
  getAllTableShelves(): Observable<AdminShelf[]> {
    return this.httpClient.get<AdminShelf[]>('/getAllTableShelves').pipe(
      map((shelves: AdminShelf[]) => shelves.sort((a, b) => b.productCount - a.productCount))
    );
  }
}
