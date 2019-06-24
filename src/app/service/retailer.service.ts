import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RetailerService {
  base_url: string = 'http://localhost:4444'

  token: string = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : ''
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }


  constructor(private http: HttpClient) { }

  // get a retailer details
  details(id) {
    return this.http.get(`${this.base_url}/retailer/${id}`, this.httpOptions)
  }


  // get all retailer orders
  products(id) {
    return this.http.get(`${this.base_url}/retailer/products/${id}`, this.httpOptions)
  }
}