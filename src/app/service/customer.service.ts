import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HttpModule } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  base_url: string = 'http://localhost:4444'

  token: string = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : ''
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  constructor(private http: HttpClient) { }

   // register a customer
   register(customer): Observable<any> {
    let post_data = {
      password: customer.password,
      password_confirmation: customer.password_confirmation,
      email: customer.email,
      username:customer.username,
      phone: customer.phone,
      full_name: customer.full_name
    }
    return this.http.post(`${this.base_url}/user`, post_data, this.httpOptions)
  }


  // log a customer in
  log_in(customer): Observable<any> {
    let post_data = {
      email: customer.email,
      password: customer.password
    }
    return this.http.post(`${this.base_url}/user/login`, post_data, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.log('Error--', error)
          return of({})
        })
      )
  }

  // log a customer out
  log_out() {
    localStorage.removeItem('access_token')
    return this.http.post(`${this.base_url}/user/logout`, {}, this.httpOptions)
  }


  // get a customer details
  details(id) {
    return this.http.get(`${this.base_url}/user/${id}`, this.httpOptions)
  }

  //get current user
  get_current_user() {
    return JSON.parse(localStorage.getItem('current_user'))
  }

  //set session
  set_session(customer) {
    localStorage.setItem('access_token', customer['token'])
    localStorage.setItem('current_user', JSON.stringify(customer.customer))
  }

  // get all user orders
  orders(id) {
    let token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : ''
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get(`${this.base_url}/order/retailer/${id}`, httpOptions)
  }

  
  get_token() {
    return localStorage.getItem('access_token')
  }

  getcurrent() {
    return JSON.parse(localStorage.getItem('current_user'))
  }

  // update a user details
  update(customer): Observable<any> {
    let put_data = {
      email: customer.email,
      phone: customer.phone,
      full_name: customer.full_name,
      password: customer.password,
      password_confirmation: customer.password_confirmation

    }
    return this.http.put(`${this.base_url}/customer/${customer.id}`, put_data, this.httpOptions)
  }
}
