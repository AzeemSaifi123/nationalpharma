import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { userData } from '../utility/datatype';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:any = environment.apiUrl;

  constructor(private http:HttpClient) {
      
  }

  sendQuery(data: userData) {
    return this.http.post<userData>(`${this.baseUrl}/query`,data,{observe:'response'})
  }

  states(){
    return this.http.get(`${this.baseUrl}/places`);
  }

  cities(){
    return this.http.get(`${this.baseUrl}/places?key[]`);
  }

}
