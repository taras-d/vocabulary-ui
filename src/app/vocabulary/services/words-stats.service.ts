import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WordsStatsService {
  constructor(private http: HttpClient) {}

  getAvailableYears(): Observable<number[]> {
    return this.http.get<number[]>(`words-stats`, {
      params: { type: 'available-years' }
    });
  }

  getTotalInMonth(year: number): Observable<number[]> {
    return this.http.get<number[]>(`words-stats`, {
      params: { type: 'total-in-month', year: `${year}` }
    });
  }
}
