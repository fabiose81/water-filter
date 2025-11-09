import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Water } from '../interface/water.interface'

@Injectable({ providedIn: 'root' })
export class AppService {

    url = process.env['API_URL'] || '';

    constructor(private http: HttpClient) { }

    start(): Observable<any> {
        const headers = this.getHeader();             
        return this.http.post(this.url.concat('/water-filter'), { headers: headers });
    }

    list(): Observable<Water[]> {
        const headers = this.getHeader();        
        return this.http.get<Water[]>(this.url.concat('/water-filter'), { headers: headers });
    }

    get(id: string): Observable<Water> {
        const headers = this.getHeader();  
        let params = new HttpParams(); 
    
        if (id) {
           params = params.set('id', id)                 
        } 

        return this.http.get<Water>(this.url.concat('/water-filter'), { headers: headers, params: params });
    }

    getHeader(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        });

        return headers;
    }
}