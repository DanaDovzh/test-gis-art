import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  constructor(
    private _http: HttpClient,
    @Inject('API_URL') private _apiUrl: string
  ) {}

  getInfoRepositories(login?: string, params?: any) {
    return this._http.get(`${this._apiUrl}/users/${login}/repos`, { params });
  }
}
