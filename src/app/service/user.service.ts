import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { User } from '../model/user.class';

const url: string = "http://localhost:8080/users/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  list(): Observable<JsonResponse> {
    return this.http.get(url) as Observable<JsonResponse>;
  }

  login(user: User): Observable<JsonResponse> {
    return this.http.post(url+'login', user) as Observable<JsonResponse>;
  }

  create(users: User): Observable<JsonResponse> {
    return this.http.post(url, users) as Observable<JsonResponse>;
  }

  get(id: number): Observable<JsonResponse> {
    return this.http.get(url+id) as Observable<JsonResponse>;
  }

  edit(user: User): Observable<JsonResponse> {
    return this.http.put(url, user) as Observable<JsonResponse>;
  }
  
  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(url+id) as Observable<JsonResponse>;
  }

}
