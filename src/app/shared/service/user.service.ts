import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dto/user';
import { SuccessResponse } from '../dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  editingUser : User | null = null;

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>('/admin/user/getAll');
  }

  addUser(user: User): Observable<SuccessResponse>{
    return this.httpClient.post<SuccessResponse>('/admin/user/signup',user );
  }

  updateUser(user: User): Observable<SuccessResponse>{
    return this.httpClient.post<SuccessResponse>('/admin/user/update',user );
  }

  deleteUser(user: User): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>('/admin/user/delete', user);
  }


}
