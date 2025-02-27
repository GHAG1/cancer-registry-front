import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class CollecteService {

  private apiUrl = environment.apiURL + '/collectes';

  constructor(private http: HttpClient) {}

  getCollectes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveCollecte(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
