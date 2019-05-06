import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from '@core/services';
import { WordsService } from '@vocabulary/services';
import { BaseComponent } from '@core/utils';

@Component({
  selector: 'v-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.less']
})
export class WordsListComponent extends BaseComponent implements OnInit {
  loading: boolean;
  search: string;
  words: any[] = [];
  paging = { page: 1, pageSize: 10, total: 0, meta: '' };

  constructor(
    private notificationService: NotificationService,
    private wordsService: WordsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getWords();
  }

  getWords(): void {
    this.loading = true;
    const { page, pageSize } = this.paging;

    this.wordsService.getWords(this.search, {
      skip: (page * pageSize) - pageSize, limit: pageSize
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: any) => {
      this.words = res.data;
      this.paging = {
        page: res.skip / res.limit + 1, pageSize: res.limit,
        total: res.total,
        meta: `${res.skip + 1}-${res.skip + res.data.length} of ${res.total} words`
      };
      this.loading = false;
    }, err => {
      this.notificationService.defaultErrorHandler(err);
      this.loading = false;
    });
  }

  deleteWord(word: any): void {
    this.loading = true;
    this.wordsService.deleteWord(word._id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.paging.page > 1 && this.words.length === 1) {
        this.paging.page -= 1;
      }
      this.getWords();
    }, err => {
      this.notificationService.defaultErrorHandler(err);
      this.loading = false;
    });
  }

  pageChange(page: number): void {
    this.paging.page = page;
    this.getWords();
  }

  editComplete(res: any): void {
    const word = this.words.find(w => w._id === res._id);
    Object.assign(word, res);
  }
}
