import { Injectable } from '@angular/core';
import { Quotation } from '../interfaces/quotation';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }
  
  getQuotation(body: Quotation){
    
    const token = localStorage.getItem('token')
    const httpHeaders:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.apiUrl+'/quotation',body,{headers:httpHeaders});
   }
}
