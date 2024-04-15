import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ChangePasswordRequest } from '../dto/changePasswordRequest';
import { SuccessResponse } from '../../shared/dto/successResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public changePassword(changePassword: ChangePasswordRequest): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>("/admin/changePassword", changePassword);
  }

}
