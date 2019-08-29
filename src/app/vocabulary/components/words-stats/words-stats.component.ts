import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { takeUntil, tap, mergeMap } from 'rxjs/operators';
import Chart from 'chart.js';

import { BaseComponent } from '@shared/components/base/base-component';
import { WordsStatsService } from '@vocabulary/services/words-stats.service';

@Component({
  selector: 'v-words-stats',
  templateUrl: './words-stats.component.html',
  styleUrls: ['./words-stats.component.less']
})
export class WordsStatsComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  loading: boolean;
  years: number[];
  selectedYear: number;
  totalInMonth: number[];
  chart: Chart;
  message: { type: string, text: string };

  constructor(
    private wordsStatsService: WordsStatsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroyChart();
  }

  trackYear(index: number, year: number): any {
    return year;
  }

  yearClick(year: number): void {
    if (this.selectedYear !== year) {
      this.selectedYear = year;
      this.loadData();
    }
  }

  private loadData(): void {
    this.loading = true;
    this.message = null;

    this.loadYears().pipe(
      mergeMap(() => this.loadTotalInMonth()),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (!this.totalInMonth) {
        this.message = { type: 'info', text: 'No data' };
      }
      this.loading = false;
    }, () => {
      this.message = { type: 'danger', text: 'Service temporarely unavailable' };
      this.loading = false;
    });
  }

  private loadYears(): Observable<any> {
    if (this.years) {
      return of(null);
    }

    return this.wordsStatsService.getAvailableYears().pipe(
      tap((years: number[]) => {
        this.years = years;
        this.selectedYear = years[0];
      })
    );
  }

  private loadTotalInMonth(): Observable<any> {
    if (!this.selectedYear) {
      return of(null);
    }

    return this.wordsStatsService.getTotalInMonth(this.selectedYear).pipe(
      tap((totalInMonth: number[]) => {
        this.totalInMonth = totalInMonth;
        if (this.chart) {
          this.updateChart(this.totalInMonth);
        } else {
          setTimeout(() => this.createChart(this.totalInMonth));
        }
      })
    );
  }

  private createChart(data: number[]): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'New words', data,
          backgroundColor: 'rgba(118, 219, 255, 0.5)',
          borderColor: 'rgba(118, 219, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        legend: false
      }
    });
  }

  private updateChart(data: number[]): void {
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
