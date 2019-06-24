import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CylinderService {

  baseUrl = 'http://localhost:4444';

  token: string = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token')  : ''
  httpOptions = {
    headers: new HttpHeaders({ 
                     'Content-Type': 'application/json',
                     'Authorization': this.token
                  })
  }


  constructor(private http: HttpClient) { }

  add(cylinder):Observable<any> {
    let post_cylinder = {
      serialNumber: cylinder.serialNumber,
      manufactureDate:  cylinder.manufactureDate,
      manufactureName: cylinder.manufactureName,
      capacity: cylinder.capacity,
      batchNumber: cylinder.batchNumber,
      trackerNumber: cylinder.trackerNumber,
      price: cylinder.price,
      quantity: cylinder.quantity,
    }

    return this.http.post(`${this.baseUrl}/cylinder`, post_cylinder, this.httpOptions);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/cylinder`, this.httpOptions);
  }

  all() {
    return this.http.get(`${this.baseUrl}/cylinder`,this.httpOptions);
  }

  all_lost() {
    return this.http.get(`${this.baseUrl}/cylinder/lost`,this.httpOptions);
  }

  report_lost(id) {
    return this.http.post(`${this.baseUrl}/cylinder/${id}/lost`, { },this.httpOptions);
  }

  report_found(id) {
    return this.http.post(`${this.baseUrl}/cylinder/${id}/recovered`, { },this.httpOptions);
  }


}
