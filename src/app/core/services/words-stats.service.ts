import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WordsStatsService {
  constructor(private http: HttpClient) {}

  getAvailableYears(): Observable<any> {
    return this.http.get(`words-stats`, {
      params: { _auth: 'true', type: 'available-years' }
    });
  }

  getTotalInMonth(year: number): Observable<any> {
    return this.http.get(`words-stats`, {
      params: { _auth: 'true', type: 'total-in-month', year: `${year}` }
    });
  }
}
