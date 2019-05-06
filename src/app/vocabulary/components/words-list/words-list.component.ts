import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap, mergeMap, merge } from 'rxjs/operators';

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
  paging = { page: 1, pageSize: 10, total: 0 };

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
    this.getWordsRequest().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: err => {
        this.loading = false;
        this.notificationService.defaultErrorHandler(err);
      }
    });
  }

  deleteWord(word: any): void {
    this.loading = true;
    this.wordsService.deleteWord(word._id).pipe(
      mergeMap(() => {
        if (this.paging.page > 1 && this.words.length === 1) {
          this.paging.page -= 1;
        }
        return this.getWordsRequest();
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      error: err => {
        this.notificationService.defaultErrorHandler(err);
        this.loading = false;
      }
    });
  }

  editComplete(res: any): void {
    const word = this.words.find(w => w._id === res._id);
    Object.assign(word, res);
  }

  private getWordsRequest(): Observable<any> {
    const { page, pageSize } = this.paging;
    return this.wordsService.getWords(this.search, {
      skip: (page * pageSize) - pageSize, limit: pageSize
    }).pipe(
      tap((res: any) => {
        this.words = res.data;
        this.paging = {
          page: (res.skip / res.limit) + 1,
          pageSize: res.limit,
          total: res.total
        };
        this.loading = false;
      })
    );
  }
}
