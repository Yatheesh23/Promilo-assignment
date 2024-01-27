import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private loginUrl = 'https://apiv2stg.promilo.com/user/oauth/token';
  private productsUrl = 'https://api.kalpav.com/api/v1/product/category/retail '
  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.loginUrl}`, credentials);
  }
  getAllProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg==',
    });

    return this.http.get(`${this.productsUrl}`, { headers });
  }

}

