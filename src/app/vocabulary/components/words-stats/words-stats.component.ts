import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from '@core/services';
import { WordsStatsService } from '@vocabulary/services';
import { BaseComponent } from '@core/utils';

@Component({
  selector: 'v-words-stats',
  templateUrl: './words-stats.component.html',
  styleUrls: ['./words-stats.component.less']
})
export class WordsStatsComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;

  loading: boolean;
  availableYears: number[];
  selectedYear: number;
  totalInMonth: { month: number, total: number }[];
  chart: Chart;

  constructor(
    private notificationService: NotificationService,
    private wordsStatsService: WordsStatsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAvailableYears();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroyChart();
  }

  getAvailableYears(): void {
    this.loading = true;
    this.wordsStatsService.getAvailableYears().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.availableYears = res;
      this.selectedYear = res[0];
      this.loading = !!this.selectedYear;
      if (this.selectedYear) {
        this.getTotalInMonth();
      }
    }, this.notificationService.defaultErrorHandler);
  }

  getTotalInMonth(): void {
    this.loading = true;
    this.wordsStatsService.getTotalInMonth(this.selectedYear).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.totalInMonth = res;
      this.loading = false;
      const data = this.totalInMonth.map(i => i.total);
      if (this.chart) {
        this.updateChart(data);
      } else {
        setTimeout(() => this.createChart(data));
      }
    }, this.notificationService.defaultErrorHandler);
  }

  createChart(data: number[]): void {
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

  updateChart(data: number[]): void {
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  yearClick(year: number): void {
    if (this.selectedYear !== year) {
      this.selectedYear = year;
      this.getTotalInMonth();
    }
  }
}
