import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import * as moment from 'moment';

import { WordsStatsService, AppService } from '../../core/services';
import { ObserverManager, getErrorMessage } from '../../core/utils';

@Component({
  selector: 'v-words-stats',
  templateUrl: './words-stats.component.html',
  styleUrls: ['./words-stats.component.less']
})
export class WordsStatsComponent implements OnInit, OnDestroy {

  @ViewChild('canvas') canvas: ElementRef;

  firstLoading: boolean;
  loading: boolean;

  years = {
    available: [],
    selected: null
  };

  totalInMonth: any[];

  om: ObserverManager;

  chart: any;

  constructor(
    private appService: AppService,
    private wordsStatsService: WordsStatsService
  ) {
    this.om = new ObserverManager({

      getAvailableYears: {
        create: () => {
          this.firstLoading = true;
          return this.wordsStatsService.getAvailableYears();
        },
        next: res => {
          this.years.available = res;
          this.years.selected = this.years.available[0];
          this.om.invoke('getTotalInMonth');
        }
      },

      getTotalInMonth: {
        create: () => {
          this.loading = true;
          return this.wordsStatsService.getTotalInMonth(this.years.selected);
        },
        next: res => {
          this.totalInMonth = res;
          this.firstLoading = this.loading = false;

          const data = this.totalInMonth.map(i => i.total);

          if (this.chart) {
            this.updateChart(data);
          } else {
            setTimeout(() => this.createChart(data));
          }
        }
      }

    }, {

      error: (name, err) => {
        this.appService.pushMessage({
          header: 'Error', text: getErrorMessage(err), type: 'error'
        });
        this.loading = false;
      }

    });
  }

  ngOnInit(): void {
    this.om.invoke('getAvailableYears');
  }

  ngOnDestroy(): void {
    this.destroyChart();
    this.om.unsubAll();
  }

  createChart(data: any): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: moment.months(),
        datasets: [{
          label: 'Words added', data,
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

  updateChart(data: any): void {
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  onYearSelect(year: number): void {
    if (this.years.selected === year) {
      return;
    }

    this.years.selected = year;
    this.om.invoke('getTotalInMonth');
  }

}
