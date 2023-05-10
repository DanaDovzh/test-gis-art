import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {

  constructor(private _http: HttpClient) {}

  getInfoRepositories(login?: string, params?: any) {
    return this._http.get(`https://api.github.com/users/${login}/repos`, { params })
  }
}
