import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private _http: HttpClient,
    @Inject('API_URL') private _apiUrl: string
  ) {}

  getUsers(params: any) {
    return this._http.get(`${this._apiUrl}/search/users`, { params });
  }
}
