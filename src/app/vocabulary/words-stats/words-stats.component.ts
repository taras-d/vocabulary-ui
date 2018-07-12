import { Component, OnInit, OnDestroy } from '@angular/core';

import { WordsStatsService, AppService } from '../../core/services';
import { ObservableManager, getErrorMessage } from '../../core/utils';

@Component({
  selector: 'v-words-stats',
  templateUrl: './words-stats.component.html',
  styleUrls: ['./words-stats.component.less']
})
export class WordsStatsComponent implements OnInit, OnDestroy {

  firstLoading: boolean;
  loading: boolean;

  years = {
    available: [],
    selected: null
  };

  totalInMonth: any[];

  om: ObservableManager;

  constructor(
    private appService: AppService,
    private wordsStatsService: WordsStatsService
  ) {
    this.om = new ObservableManager({

      getAvailableYears: {
        create: () => {
          this.firstLoading = true;
          return this.wordsStatsService.getAvailableYears()
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
    this.om.unsubAll();
  }

  onYearSelect(year: number): void {
    if (this.years.selected === year) {
      return;
    }

    this.years.selected = year;
    this.om.invoke('getTotalInMonth');
  }

}
