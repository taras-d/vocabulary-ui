import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class WordsStatsService {

  constructor(private apiService: ApiService) {

  }

  getAvailableYears(): Observable<any> {
    return this.apiService.get(`words-stats`, {
      params: { type: 'available-years' }
    });
  }

  getTotalInMonth(year: number): Observable<any> {
    return this.apiService.get(`words-stats`, {
      params: { type: 'total-in-month', year }
    });
  }

}
