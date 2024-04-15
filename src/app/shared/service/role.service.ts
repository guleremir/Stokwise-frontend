import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dto/user';
import { SuccessResponse } from '../dto/successResponse';
import { Role } from '../dto/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllRoles(): Observable<Role[]>{
    return this.httpClient.get<Role[]>('/role/getAll');
  }


}
