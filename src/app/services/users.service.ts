import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestUsersInterface } from '../interface/users.interface';
@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private _http: HttpClient) {}

  getUsers(params?: any) {
    return this._http.get('https://api.github.com/search/users?q=shdevsir', { params })
  }
}
