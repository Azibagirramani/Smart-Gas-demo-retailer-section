import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url: string = 'http://localhost:4444'

  token: string = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token')  : ''
  httpOptions = {
    headers: new HttpHeaders({ 
                     'Content-Type': 'application/json',
                     'Authorization': this.token
                  })
  }

  constructor(private http: HttpClient) { }


  // register a user
  register(user): Observable<any> {
    let post_data = {
      password: user.password,
      password_confirmation: user.password_confirmation,
      email: user.email,
      phone: user.phone
    }
    return this.http.post(`${this.base_url}/user`, post_data, this.httpOptions)
  }


  // log a user in
  log_in(user): Observable<any> {
    let post_data = {
      email: user.email,
      password: user.password
    }
    return this.http.post(`${this.base_url}/user/login`, post_data, this.httpOptions)
               .pipe(
                 catchError((error)=> {
                  console.log('Error--', error) 
                  return of({})
                 }) 
               )
  }

  // log a user out
  log_out() {
    localStorage.removeItem('access_token')
    return this.http.post(`${this.base_url}/user/logout`, {}, this.httpOptions)
  }


  // get a user details
  details(id) {
    return this.http.get(`${this.base_url}/user/${id}`, this.httpOptions)
  }

   //get current user
   get_current_user() {
    return JSON.parse(localStorage.getItem('current_user'))
  }

  //set session
  set_session(user) {
    localStorage.setItem('access_token', user['token'])
    localStorage.setItem('current_user', JSON.stringify(user.user))
  }



  // get all user orders
  orders(id) {
    return this.http.get(`${this.base_url}/order/user/${id}`, this.httpOptions)
  }

  get_token() {
    return localStorage.getItem('access_token')
  }

  getcurrent(){
    return JSON.parse(localStorage.getItem('current_user'))
  }

   // update a user
   update(user): Observable<any> {
    let put_data = {
      email: user.email,
      phone: user.phone
    }
    return this.http.put(`${this.base_url}/customer/${user.id}`, put_data, this.httpOptions)
  }

  all_users() {
    let httpOptions = {
      headers: new HttpHeaders({ 
                       'Content-Type': 'application/json',
                       'Authorization': `Bearer  ${this.get_token()}`
                    })
    }
     
    return this.http.get(`${this.base_url}/user`, httpOptions)
  }

}
