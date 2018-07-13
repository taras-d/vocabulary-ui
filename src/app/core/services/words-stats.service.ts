import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import Chart from 'chart.js';

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

  renderTotalInMonthChart(canvas: HTMLCanvasElement, totalInMonth: any): void {
    const data = totalInMonth.map(i => i.total);
    new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: moment.months(),
        datasets: [{
          label: 'Words added', data
        }]
      },
      options: {
        legend: false
      }
    });
  }

}
