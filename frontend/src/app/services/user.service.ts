import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { userData } from '../utility/datatype';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:any = environment.apiUrl;
  showHeader = new Subject<boolean>();

  constructor(private http:HttpClient) {
      
  }
 
  sendQuery(data: userData) {
    let header:any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
      return this.http.post<userData>(`${this.baseUrl}/queries`,data,header) 
  }

  getQuery() {
    return this.http.get<userData[]>(`${this.baseUrl}/queries`)
  }

  states(){
    return this.http.get<any>(`${this.baseUrl}/places`);
  }

  cities(){
    return this.http.get(`${this.baseUrl}/places?key[]`);
  }

}


// Welcomei@123