import { Injectable } from '@angular/core';
import { Shelf } from '../dto/shelf';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  editingShelf : Shelf | null = null;

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllShelves(){
    return this.httpClient.get<Shelf[]>('/getAllShelves');
  }

  addShelf(shelf : Shelf):Observable<SuccessResponse>{
    return this.httpClient.post<SuccessResponse>('/addShelf', shelf);
  }

  deleteShelf(id : number):Observable<SuccessResponse>{
    return this.httpClient.post<SuccessResponse>('/deleteShelf', {id});
  }

  editShelf(shelf : Shelf): Observable<SuccessResponse>{
    return this.httpClient.post<SuccessResponse>('/editShelf', shelf);
  }


}
